
## Official pnpm 11 configuration findings

Official pnpm 11 documentation: https://pnpm.io/settings and https://pnpm.io/package_json.

The project-level pnpm configuration file is `pnpm-workspace.yaml`. Since pnpm 11, non-auth pnpm settings are not read from `.npmrc`, and settings in the legacy `pnpm` field in `package.json` are no longer read. The official settings reference documents `overrides` and `patchedDependencies` as pnpm settings; they should be placed in the supported project configuration, `pnpm-workspace.yaml`, not in a proposed `.pnpmrc.yaml` file.

The user-provided suggested hash `sha512.c753b6c3...` was previously associated with the old pnpm 10.4.1 package-manager declaration in this project. It must not be appended to `pnpm@11.24.0` as if it were the pnpm 11 checksum. The Hostinger-compatible declaration used here is the unambiguous `packageManager: pnpm@11.24.0`, with pnpm 11 settings in `pnpm-workspace.yaml`.

Official pnpm 11 release notes: https://pnpm.io/blog/releases/11.0. pnpm 11 requires Node.js 22 or newer and uses `allowBuilds` for permitted dependency build scripts. The project workspace file therefore contains the required `allowBuilds` entries for `@tailwindcss/oxide` and `esbuild`, alongside the existing patch and override settings where applicable.
