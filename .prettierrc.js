const config = {
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrder: [
    '~/constants/*',
    '~/configs/*',
    '~/libs/*',
    '~/hooks',
    '~/store/*',
    '~/types/(.)*',
    '~/components/(.)*'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}

module.exports = config
