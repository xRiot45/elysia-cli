![Screenshot from 2025-06-19 16-16-43](https://github.com/user-attachments/assets/a4bb9ad2-9f11-459e-bdde-c74c12a8bcc0)

<h1 align="center">Elysia JS CLI</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Bun.js-000000?style=for-the-badge&logo=bun&logoColor=white" alt="bun.js" />
  <img src="https://img.shields.io/badge/Elysia.js-ff69b4?style=for-the-badge&logo=elysia&logoColor=white" alt="elysia.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
</p>

<p align="center">
Elysia JS CLI is a Command Line Interface (CLI) tool designed to make it easier and faster to create projects using Elysia JS Framework.
</p>

---

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 📌 [Features](#features)
4. 🧸 [Quick Start](#quick-start)
5. 📜 [CLI Usage](#cli-usage)
6. 📦 [Project Structure](#project-structure)
7. 🔗 [Links](#links)
8. 🙏 [Acknowledgements](#acknowledgements)

---

## 🤖 Introduction

**Elysia JS CLI** is a developer-friendly CLI tool that simplifies and accelerates the process of scaffolding new projects using the Elysia JS Framework.

It helps developers to:

- Scaffold fully configured projects following industry best practices.
- Automate repetitive setup tasks such as creating folder structures, configuration files, installing dependencies, and more.
- Focus more on building core application features instead of spending time on initial setup.

Whether you're starting a prototype or a production-ready app, **Elysia JS CLI** provides a smooth and efficient starting point for both beginners and experienced developers.

---

## ⚙️ Tech Stack

- **Bun JS** : Ultra-fast JavaScript runtime.
- **Elysia JS** : Minimalist and fast web framework.
- **TypeScript** : Type-safe JavaScript superset.

---

## 📌 Features

- **Project Type Selection**

    - Currently supports **REST API** scaffolding (more types coming soon).

- **Optional Tools Integration**

    - Prettier – Code formatting.
    - ESLint – Code linting and static analysis.
    - Husky – Git hooks integration.
    - Commitlint – Enforce conventional commits.

- **Database Support**

    - MySQL (more databases coming soon).

- **ORM Integration**

    - Drizzle ORM – Type-safe SQL ORM.

- **Version Control Initialization**

    - Automatic Git initialization with first commit.

- **Project Boilerplate Generation**

    - Predefined folder structure, config files, sample code using schematics.

- **Environment Configuration**

    - Auto-generate `.env` template file.

- **Interactive CLI**

    - Smooth, intuitive question-based setup.

---

## 🧸 Quick Start

### 1. Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/)

### 2. Installation

```bash
bun install -g elysia-js-cli
```

### 3. Create New Project

```bash
elysia new <projectName>
```

### 4. CLI Interactive Questions

- **Project type** : REST API
- **Use Prettier?** : (Y/n)
- **Use ESLint?** : (Y/n)
- **Enable Husky & Commitlint?** : (Y/n)
- **Choose database** : MySQL
- **Choose ORM** : Drizzle ORM
- **Initialize Git?** : (Y/n)

### 5. Running Your Project

```bash
cd <your-project>
bun run format  # optional formatting
bun run dev
```

### 6. Verify Setup

Check server with Postman or curl:

```bash
curl http://localhost:3000
```

You should receive a successful response from your server.

---

## 📜 CLI Usage

### Display Help

```bash
elysia -h
```

### Options

| Option          | Description          |
| --------------- | -------------------- |
| `-v, --version` | Show current version |
| `-i, --info`    | Show CLI information |
| `-h, --help`    | Show help            |

### Commands

| Command                           | Description                  |
| --------------------------------- | ---------------------------- |
| `new <projectName>`               | Create new Elysia JS project |
| `generate <schematic> <fileName>` | Generate new file            |

### Available Schematics

| Schematic    | Description                                               |
| ------------ | --------------------------------------------------------- |
| `controller` | Generate controller file                                  |
| `service`    | Generate service file                                     |
| `route`      | Generate route file                                       |
| `repository` | Generate repository file                                  |
| `validation` | Generate validation file                                  |
| `model`      | Generate model file                                       |
| `interface`  | Generate interface file                                   |
| `resources`  | Generate full resources (controller, service, route, etc) |
| `config`     | Generate config file                                      |
| `middleware` | Generate middleware file                                  |
| `util`       | Generate utility file                                     |
| `enum`       | Generate enum file                                        |

#### Example:

```bash
elysia generate controller user
```

This will create `src/controllers/user.controller.ts` based on template.

---

## 📦 Project Structure

Example structure after scaffolding:

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

## 🔗 Links

- [Elysia JS](https://elysiajs.com/)
- [Bun](https://bun.sh/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/)
- [Commitlint](https://commitlint.js.org/)

---

## 🙏 Acknowledgements

Big thanks to [SaltyAom](https://github.com/saltyaom) for creating [Elysia JS](https://elysiajs.com/), which inspired and powered the development of this CLI tool.

> _Note: More features coming soon!_ 🚀
