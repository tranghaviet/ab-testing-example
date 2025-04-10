module.exports = {
    semi: false,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    endOfLine: 'lf',
    importOrder: [
      '^(react/(.*)$)|^(react$)',
      '^(next/(.*)$)|^(next$)',
      '<THIRD_PARTY_MODULES>',
      '^@/(.*)$',
      '^[./]',
    ],
    importOrderSeparation: true,
    plugins: ['prettier-plugin-tailwindcss'],
  };
  