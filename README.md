<div align="center">
<a href="https://github.com/sankeyangshu/lemon-template-uniapp">
  <img alt="Lemon-Template-Uniapp" width="200" height="200" src="./src/static/svg-icon/logo.svg">
</a>

<h1 align="center">
  lemon-template-uniapp
</h1>

一个基于 Uniapp 生态系统的移动小程序应用模板。

<p >
  <img src="https://img.shields.io/github/license/sankeyangshu/lemon-template-uniapp" alt="license" />
  <img src="https://img.shields.io/github/package-json/v/sankeyangshu/lemon-template-uniapp" alt="version" />
  <img src="https://img.shields.io/github/languages/top/sankeyangshu/lemon-template-uniapp" alt="languages" />
  <img src="https://img.shields.io/github/repo-size/sankeyangshu/lemon-template-uniapp" alt="repo-size" />
  <img src="https://img.shields.io/github/issues-closed/sankeyangshu/lemon-template-uniapp" alt="issues" />
</p>

</div>

---

## 简介

🚀🚀🚀 **lemon-template-uniapp** 使用了最新的`Uniapp`、`Vue3`、`Vite`、`uni-helper`、`wot-ui`、`Pinia`、`Typescript`、`TailwindCSS`等主流技术开发，集成 `Dark Mode`（暗黑）模式和系统主题色等功能。

你可以在此之上直接开发你的业务代码！希望你能喜欢。👋👋👋

> [!NOTE]
> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！

## 其他模版

- [lemon-template-react](https://github.com/sankeyangshu/lemon-template-react) - 基于 React 生态系统的移动 web 应用模板
- [lemon-template-vue](https://github.com/sankeyangshu/lemon-template-vue) - 基于 Vue3 生态系统的移动 web 应用模板

## 项目功能

- ⚡️ 使用 Vue3 + TypeScript 开发，单文件组件**＜ script setup ＞**
- ✨ 采用 Vite 作为项目开发、打包工具
- 🍕 整个项目集成了 TypeScript
- 🍍 使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 📦 组件自动化加载
- 🔄 uni-helper 增强 uni-app 的开发体验
- 🎨 wot-ui 组件库
- 🌀 TailwindCSS 即时原子化 CSS 引擎
- 👏 集成多种图标方案
- 🌓 支持深色模式
- 🌍 多语言国际化，支持 i18n国际化方案
- ⚙️ 使用 Vitest 进行单元测试
- ☁️ Axios 封装
- 💪 集成 Eslint 代码校验规范，并且该 Eslint 配置默认使用 Prettier 格式化代码，
- 🌈 使用 simple-git-hooks、lint-staged、commitlint 规范提交信息

## 基础知识

提前了解和学习这些知识会对使用本项目有很大的帮助。

- [Vue3](https://v3.vuejs.org/) - 熟悉 `Vue3` 基础语法
- [Vite](https://cn.vitejs.dev/) - 熟悉 `Vite` 特性
- [Pinia](https://pinia.vuejs.org/) - 熟悉 `Pinia` 特性
- [TypeScript](https://www.typescriptlang.org/) - 熟悉 `TypeScript` 基本语法
- [Vue-Router](https://router.vuejs.org/) - 熟悉 `Vue-Router`基本使用
- [Icones](https://icones.js.org/) - 本项目推荐图标库
- [Tailwind CSS](https://tailwindcss.com/) - 高性能且极具灵活性的即时原子化 CSS 引擎
- [uni-helper](https://uni-helper.js.org/) 增强 uni-app 的开发体验
- [wot-ui](https://wot-design-uni.pages.dev/) - 移动端 wot-ui 组件库
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 `ES6` 基本语法

## 环境准备

本地环境需要安装 [Pnpm](https://www.pnpm.cn/)、[Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/)

- 推荐使用 [pnpm>=8.15.4](https://www.pnpm.cn/)，否则依赖可能安装不上，出现打包报错等问题。
- [Node.js](http://nodejs.org/) 版本要求`18.x`以上，这里推荐 `^18.18.0 || >=20.0.0`。

## Vscode 配套插件

如果你使用的 IDE 是[vscode](https://code.visualstudio.com/)(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - vue 开发必备
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind CSS 提示插件
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - `.env` 文件 高亮
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) - 更好的错误定位
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - 不同 IDE 维护一致的编码样式
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - 多合一的 I18n 支持
- [JavaScript and TypeScript Vscode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-javascript-typescript-snippets) - JavaScript 和 TypeScript 代码片段
- [Vue Collection Vscode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-vue-collection-snippets) - 提供 Vue 2/3 代码片段

## 安装和使用

### 使用脚手架

```bash
# 复制命令 - project 为你的项目名称
pnpm create lemon project -t lemon-uniapp
```

### GitHub 模板

[使用这个模板创建仓库](https://github.com/sankeyangshu/lemon-template-uniapp/generate)

### 克隆使用

```bash
# 克隆项目
git clone https://github.com/sankeyangshu/lemon-template-uniapp.git

# 进入项目目录
cd lemon-template-uniapp

# 安装依赖 - 推荐使用pnpm
pnpm install

# 选择合适的平台启动服务，默认微信小程序
pnpm dev

# 选择合适的平台打包发布，默认微信小程序
pnpm build

# 选择合适的平台启动服务，例如 H5
# pnpm dev h

# 选择合适的平台打包发布，例如 H5
# pnpm build h
```

## Git 提交规范

### 提交规范

项目使用 `simple-git-hooks` 和 `commitlint` 规范 Git 提交信息，遵循社区主流的 [Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) 规范。

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能，例如空格、分号等格式修正）
- `refactor`: 代码重构（不包括 bug 修复、功能新增）
- `perf`: 性能优化
- `test`: 添加、修改测试用例
- `build`: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
- `ci`: 修改 CI 配置、脚本
- `chore`: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
- `revert`: 回滚 commit

## 社区

您可以使用 [issue](https://github.com/sankeyangshu/lemon-template-uniapp/issues) 来反馈问题，或者提交一个 Pull Request。

## 平台兼容性

| H5  | IOS | 安卓 | 微信小程序 | 字节小程序 | 快手小程序 | 支付宝小程序 | 钉钉小程序 | 百度小程序 |
| --- | --- | ---- | ---------- | ---------- | ---------- | ------------ | ---------- | ---------- |
| √   | √   | √    | √          | √          | √          | √            | √          | √          |

## 许可证

[MIT](./LICENSE) License © 2024-PRESENT [sankeyangshu](https://github.com/sankeyangshu)
