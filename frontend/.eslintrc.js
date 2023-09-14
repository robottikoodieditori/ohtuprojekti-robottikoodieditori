module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true,
        "cypress/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react",
        "cypress",
        "jest"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "react/prop-types": 0,
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": 'off'
    }
}
