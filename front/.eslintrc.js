module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'airbnb',
        'react-app',
        'react-app/jest',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'no-tabs': ['error', { allowIndentationTabs: true }],
        'react/jsx-indent': [2, 4],
        indent: [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': [1, {
            extensions: ['.js', '.jsx', '.tsx'],
        }],
        'react/display-name': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'quote-props': ['error', 'as-needed'],
        'react/prop-types': 'off',
        'no-shadow': 'off',
        'react/function-component-definition': [2, {
            namedComponents: ['function-expression', 'arrow-function'],
            unnamedComponents: ['function-expression', 'arrow-function'],
        }],
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'max-len': [2, {
            ignoreComments: true,
            code: 180,
        }],
        'eslintjsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
    },
    globals: {
        __IS__DEV__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
