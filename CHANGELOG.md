# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.0] - 2025-06-22

### ✨ Added

- **Swagger (OpenAPI) Integration**:
    - Added a new CLI option to enable Swagger documentation during project setup.
    - When enabled, generated routes will automatically include OpenAPI-compliant documentation.
    - Supports detailed endpoint documentation, including:
        - `summary`, `tags`, `params`, `body`, and `responses`
        - Standard HTTP response codes: `200`, `201`, `400`, `401`, `403`, `404`, `500`

### 🛠 Changed

- Updated `route.hbs` template to include Swagger documentation conditionally using `{{#if useSwagger}}`.
- Enhanced response documentation structure for better consistency with OpenAPI standards.

### 📜 Note

- Make sure to enable the Swagger option during project setup to activate automatic documentation.

---

## [v1.0.0] - 2025-06-19

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
    - `-u, --update`: update elysia js cli

### 📜 Note

- More features coming soon!
