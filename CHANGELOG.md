# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## \[v1.0.0] - 2025-06-19

### 🚀 Added

- Initial release of **Elysia JS CLI**.
- Project scaffolding for REST API using Elysia JS framework.
- Interactive CLI with question-based project setup.
- Optional integration for:

    - Prettier (code formatting)
    - ESLint (linting and static analysis)
    - Husky (Git hooks)
    - Commitlint (enforcing conventional commits)

- Database support:

    - MySQL

- ORM integration:

    - Drizzle ORM (type-safe SQL ORM)

- Automatic Git repository initialization with first commit.
- Environment configuration file generation (`.env`).
- Project boilerplate generation with predefined folder structure and configuration files.
- Schematic generation system:

    - `controller`, `service`, `route`, `repository`, `validation`, `model`, `interface`, `resources`, `config`, `middleware`, `util`, `enum`

- CLI commands:

    - `new <projectName>`: create new project
    - `generate <schematic> <fileName>`: generate files based on schematics
    - `-v, --version`: show CLI version
    - `-i, --info`: show CLI information
    - `-h, --help`: show help menu

### 📜 Note

- More features coming soon!
