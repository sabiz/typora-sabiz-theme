# Copilot Instructions for typora-sabiz-theme

## Project Overview
- This repository contains a custom theme for [Typora](https://typora.io/), focused on unique visual styling and code block presentation.
- The theme is primarily implemented using CSS, with supporting HTML and build scripts.
- Font integration uses [HackGen](https://github.com/yuru7/HackGen), included in `src/res/HackGen/`.

## Key Directories & Files
- `src/` — Main theme CSS files:
  - `main.css`, `elements.css`, `typography.css`, `codeblock.css`, `mermaid.css`: Core style modules for different Typora elements.
  - `res/HackGen/`: Custom font files and license.
- `scripts/` — Build and install scripts:
  - `build.js`: Bundles/minifies CSS for distribution.
  - `install.js`: Installs the theme into Typora's theme directory.

## Developer Workflows
- **Build theme:**
  - Run `node scripts/build.js` to generate the distributable CSS.
- **Install theme to Typora:**
  - Run `node scripts/install.js` (may require Typora to be closed).
- **Edit styles:**
  - Modify CSS in `src/` as needed. Rebuild after changes.
- **Font updates:**
  - Place new font files in `src/res/HackGen/` and update CSS references if needed.

## Project Conventions
- CSS is modularized by function (elements, code blocks, typography, etc.).
- Use relative imports in CSS for fonts and images.
- Keep all distributable assets (fonts, minified CSS) within the repo for portability.
- No automated tests; visual inspection in Typora is the primary validation method.

## Theme Addition Guidelines
- When adding a new theme, always review `src/main.css` and other CSS files to ensure your changes harmonize with the existing themes and overall style conventions of the project.

## Integration Points
- The theme is designed for Typora and expects its HTML structure.
- No external build tools beyond Node.js are required.

## Examples
- To add a new code block style, edit `src/codeblock.css` and rebuild.
- To change the main color scheme, update `src/main.css` and `base/base.css`.

---

For questions about structure or workflow, see `README.md` or the scripts in `scripts/`.
