# Turborepo, Astro, Tailwind, DaisyUI, Netlify starter

This is a demo monorepo on how to make an easily configualbe Design System from open-source libraries.

WIP This is under active development, not production ready.

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Astro.js](https://astro.build) app
- `web`: another [Astro.js](https://astro.build) app
- `ui`: a stub component library shared by both `web` and `docs` applications
- `Design System`: UI uses [DaisyUI](https://daisyui.com) with [Tailwind](https://www.tailwindcss.com) to make an easily configurable design system.
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn run build
```

To build individual apps, run the following command:

```
cd my-turborepo/apps/web
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn run dev
```

To develop individual apps, run the following command:

```
cd my-turborepo/apps/web
yarn run dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) 
- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)

