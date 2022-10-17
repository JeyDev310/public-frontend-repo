module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-prototype-builtins': 'off',
    'max-len': ['error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true
      }
    ],
    'vue/max-attributes-per-line': 'off',
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'no-var': 2,
    'no-use-before-define': ['error',
      {
        functions: true,
        classes: true,
        variables: true
      }
    ],
    'vue/no-v-html': 'off',
    'vue/v-slot-style': ['error',
      {
        atComponent: 'shorthand',
        default: 'shorthand',
        named: 'shorthand'
      }
    ],
    'vue/new-line-between-multi-line-property': ['error',
      { minLineOfMultilineProperty: 2 }
    ],
    'vue/component-name-in-template-casing': ['error',
      'PascalCase', {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    'vue/match-component-file-name': ['error',
      {
        extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
        shouldMatchCase: false
      }
    ],
    'vue/attribute-hyphenation': 'off',
    'vue/custom-event-name-casing': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/v-on-event-hyphenation': ['error',
      'always', {
        autofix: false,
        ignore: []
      }
    ],
    'vue/require-explicit-emits': ['error',
      {
        allowProps: false
      }
    ],
    'object-curly-spacing': ['error',
      'always', {
        arraysInObjects: false
      }
    ],
    '@typescript-eslint/member-delimiter-style': ['error',
      {
        multiline: {
          delimiter: 'semi', // 'none' or 'semi' or 'comma'
          requireLast: true
        },
        singleline: {
          delimiter: 'semi', // 'semi' or 'comma'
          requireLast: true
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'semi',
              requireLast: true
            }
          }
        }
      }
    ],
    '@typescript-eslint/naming-convention': ['error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I']
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        prefix: ['T']
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        prefix: ['E']
      }
    ]
  }
}
