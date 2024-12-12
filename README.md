# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


```json5
{
  // 设置每行最大宽度为80个字符，超过此宽度的代码将会自动换行。
  "printWidth": 80,

  // 每个缩进层级使用2个空格。
  "tabWidth": 2,

  // 不使用制表符（Tab），而是使用空格进行缩进。
  "useTabs": false,

  // 使用单引号代替双引号。
  "singleQuote": true,

  // 在语句末尾添加分号。
  "semi": true,

  // 在多行输出的最后一行添加逗号（trailing comma），适用于所有支持拖尾逗号的语法结构。
  "trailingComma": "all",

  // 在对象字面量的括号之间添加空格，例如 { foo: bar }。
  "bracketSpacing": true,

  // 定义特定文件类型的覆盖规则。
  "overrides": [
    {
      // 对于 .prettierrc 文件，指定使用 JSON 解析器。
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    },
    {
      // 对于名为 document.ejs 的文件，指定使用 HTML 解析器。
      "files": "document.ejs",
      "options": {
        "parser": "html"
      }
    }
  ]
}
```