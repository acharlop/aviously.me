export const config = {runtime: 'edge'}

const SITE = 'https://aviously.me'
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/afc6532bc43364a28b0cf10f7672d901'

function redirect(to: string): Response {
  return new Response(null, {status: 303, headers: {Location: new URL(to, SITE).toString()}})
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return new Response('Method Not Allowed', {status: 405})

  const form = await request.formData()
  if (form.get('_honey')) return redirect('/contact/?sent=true') // pretend success for bots

  const token = form.get('cf-turnstile-response')
  if (typeof token !== 'string' || !token) return redirect('/contact/?error=captcha')

  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      secret: process.env.CF_TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for'),
    }),
  })
  const outcome = (await verify.json()) as {success: boolean}
  if (!outcome.success) return redirect('/contact/?error=captcha')

  const delivery = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify({
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message'),
      _subject: 'aviously.me contact form',
      _template: 'table',
      _autoresponse: 'Thanks for reaching out — I got your message and will reply soon. — Avi (aviously.me)',
    }),
  })
  if (!delivery.ok) return redirect('/contact/?error=send')

  return redirect('/contact/?sent=true')
}
