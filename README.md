# 📦 Elysia CLI Documentation

**Elysia CLI** is a simple command-line interface for scaffolding backend projects using the [Elysia JS Framework](https://elysiajs.com/). It helps you quickly bootstrap a REST API project with optional tooling and structure, including code formatting, linting, Git initialization, and file generation based on predefined templates.

---

## 📌 Features

- ✅ Choose project type (currently only **REST API** supported)
- ✅ Select optional tools:

    - [Prettier](https://prettier.io/) – for code formatting
    - [ESLint](https://eslint.org/) – for code linting
    - [Husky](https://typicode.github.io/husky/) & Commitlint – for conventional commits

- ✅ Select database (currently only **MySQL**)
- ✅ Select ORM (currently only **Drizzle ORM**)
- ✅ Initialize Git repository
- ✅ Generate boilerplate files using schematics

---

## 🚀 Installation

```bash
bun install -g elysia-js-cli
```

---

## 🛠️ CLI Usage

```bash
elysia [options] [command]
```

### Options

| Option          | Description                               |
| --------------- | ----------------------------------------- |
| `-v, --version` | Display the current version of elysia-cli |
| `-i, --info`    | Display information about elysia-cli      |
| `-h, --help`    | Display help for command                  |

---

## 📁 Project Commands

### `elysia new <projectName>`

Create a new project scaffold.

#### Example:

```bash
elysia new my-api
```

This will guide you through a set of prompts:

- Choose project type (currently only REST API)
- Enable Prettier? (Yes/No)
- Enable ESLint? (Yes/No)
- Enable Husky & Commitlint? (Yes/No)
- Choose database (currently only MySQL)
- Choose ORM (currently only Drizzle ORM)
- Initialize Git repo? (Yes/No)

---

## 🧱 File Generator

### `elysia generate <schematic> <fileName>`

Generate boilerplate files using schematics with pre-defined templates.

#### Available Schematics:

| Schematic  | Description                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------- |
| controller | Generate a new controller file                                                                      |
| service    | Generate a new service file                                                                         |
| route      | Generate a new route file                                                                           |
| repository | Generate a new repository file                                                                      |
| validation | Generate a new validation file                                                                      |
| model      | Generate a new model file                                                                           |
| interface  | Generate a new interface file                                                                       |
| enum       | Generate a new enum file                                                                            |
| config     | Generate a new config file                                                                          |
| middleware | Generate a new middleware file                                                                      |
| util       | Generate a new utility file                                                                         |
| resources  | Generate a full set of files (controller, service, route, repository, validation, model, interface) |

#### Example:

```bash
elysia generate controller user
```

This will create a `user.controller.ts` file from the predefined controller template.

---

## 📚 Example Workflow

```bash
# Create a new REST API project
elysia new my-awesome-api

# Generate a user controller
elysia generate controller user

# Generate full resource files for "product"
elysia generate resources product
```

---

## 📦 Project Structure Example

After generation, your project structure may look like this:

```
my-awesome-api/
├── .husky/
├── node_modules/
├── src/
│   ├── configs/
│   ├── controllers/
│   ├── databases/
│   │   ├── models/
│   ├── enums/
│   ├── interfaces/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── validations/
│   └── index.ts
├── .env
├── .gitignore
├── .prettierrc
├── bun.lockb
├── commitlint.config.js
├── drizzle.config.ts
├── eslint.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

---

## ✅ Conventions & Standards

- **Code Format**: Prettier (if selected)
- **Linting Rules**: ESLint with recommended rules (if selected)
- **Commits**: Conventional Commits via Husky & Commitlint (if selected)

---

## 🔧 Requirements

- Node.js v18 or higher
- npm (or yarn)
- Git (if initializing Git repo)

---

## 📦 License

MIT © \[Your Name or Organization]
