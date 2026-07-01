import type {APIRoute} from 'astro'
import {resumePlainText} from '@/lib/resume-export'

export const GET: APIRoute = () => new Response(resumePlainText(), {headers: {'Content-Type': 'text/plain; charset=utf-8'}})
