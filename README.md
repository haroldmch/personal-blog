This is a [Next.js](https://nextjs.org/) project

## Getting Started

**Step 0 (If not yet installed )**

```bash
npm i
```

**Step 1: Run, Barry, Run!**

```bash
npm run dev
```

**Step 2: Party Hard! (in local)**

http://localhost:3000

---

## Dependencies

---
## EsLint + Prettier

### Install

```bash
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

```bash
npm i -D prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-import-helpers
```

### Create or Modify `.eslintrc.json`

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "eslint-plugin-import-helpers"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "rules": {
    "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": [
          ["/^next/", "module"],
          "/^@/styles/",
          "/^@/components/",
          "/^@/lib/",
          ["parent", "sibling", "index"]
        ],
        "alphabetize": {
          "order": "asc",
          "ignoreCase": true
        }
      }
    ]
  }
}
```

### Create or Modify `.prettierrc.json`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 120,
  "tabWidth": 2
}
```

### Create or Modify `.prettierignore`

```
.next
next-env.d.ts
node_module
public
yarn.lock
package-lock.json
```

### Modify `package.json`

```json
"scripts":{
  "eslint:format": "eslint --fix .",
  "prettier:format": "prettier --write .",
  "prettier:check": "prettier --check .",
}
```

### Modify `settings.json` in VS

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

---

## Local env Variables

1) Create the env variables on vercel

2) Link the local code with vercel

```bash
npx vercel link
```
3) Pull the env file

```bash
npx vercel env pull ./.env.local
```