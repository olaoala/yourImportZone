import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,  // Add Node.js globals if needed
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect"  // Automatically detect React version
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off",    // Disable 'React must be in scope'
      "react/prop-types": "warn"            // Warn for missing PropTypes
    }
  },
  {
    files: ["**/*.test.js", "**/*.test.jsx"],
    plugins: {
      jest: pluginJest
    },
    languageOptions: {
      globals: globals.jest  // Enable Jest globals like 'test' and 'expect'
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    }
  }
];
