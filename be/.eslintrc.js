module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "linebreak-style": 0,
        "no-console": 0,
        "no-unused-vars": 1,
        "no-param-reassign": 0,
        "eslint linebreak-style": [0, "error", "windows"],
        "no-tabs": 0,
        "object-curly-newline": [
            "error",
            {
              "ObjectExpression": {
                "multiline": true,
                "consistent": true
              },
              "ObjectPattern": {
                "multiline": true,
                "consistent": true
              }
            }
          ]
    }
};