/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 126,
  trailingComma: 'all',
  bracketSpacing: false,
  jsxBracketSameLine: true,
  arrowParens: 'always',
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
}

export default config
