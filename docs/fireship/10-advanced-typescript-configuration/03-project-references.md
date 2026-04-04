# Project References

As your TypeScript project grows, it's going to become more complex. You might have several different modules that work together in the final project; you could have all of your tests in a separate folder from your implementation code; or you could be writing frontend and backend code in the same project, and need to share some code between them. In all of these cases, the default compiler behavior likely isn't going to work.

If you just have a single tsconfig.json file, TypeScript will try to combine all of your project files together into a single output folder when you build. The type checker will also have to check all of your files every time, even if you never touched certain parts of your code. If you use multiple tsconfig.json files, one for each part of your project, you still run into issues with loading in shared code, running the type checker more than is needed, and you can't take advantage of TypeScript's watch mode on all of config files at once.

Project References allow us to create multiple configs for different parts of our project while still treating the project as a whole. This gives us all the benefits - fast compilation and type checking, more control over the build output, and better separation between the different parts of the project.

Let's use a project with both a server and client component, both written in TypeScript and each with their own package.json and tsconfig.json. We also have a shared folder that includes types and utility functions used by both the server and client. Here's what our project folder looks like:

```txt
.
├── client
│   ├── package.json
│   ├── src
│   │   ├── ...
│   │   └── index.tsx
│   └── tsconfig.json
├── shared
│   ├── commonTypes.ts
│   └── commonUtils.ts
└── server
    ├── package.json
    ├── src
    │   ├── ...
    │   └── index.ts
    └── tsconfig.json
```

Currently, both of these project operate independently; what's worse, if we tried to build one of them to a directory, TypeScript would automatically deepen the folder structure of our build output, like this (only showing the folders, not files, for brevity):

```txt
.
└── client
    ├── package.json
    ├── src
    ├── build
    │   ├── shared
    │   └── client
    │       └── src
    └── tsconfig.json
```

That's obviously not ideal - what we really want is to have all of our compiled files in a flat structure inside the build folder.

Let's turn this into a referenced project. We'll create a new tsconfig.json file inside the `shared` folder, and use the `references` property in both the `client` and `server` projects to reference the shared project.

The `/shared/tsconfig.json` file can be very minimal. All we need to include is the `composite` compiler option, which tells TypeScript to treat this as a referenced project. I'm also going to include `"esModuleInterop": true` to provide greater compatibility with CommonJS, and `"outDir": "./build"`, since referenced projects depend on compiled `.d.ts` files. This makes it so the compiled files are contained and can easily be ignored by git.

```json
// /shared/tsconfig.json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "composite": true,
    "outDir": "./build"
  }
}
```

All that's left is to add the reference in my /`client/tsconfig.json` and `/server/tsconfig.json` files. I'll include a special path to the `shared` folder so I can access it with an absolute import. I can do the same thing with the server configuration too.

```json
// /client/tsconfig.json
{
  "compilerOptions": {
    // ...
    "baseUrl": "./",
    "paths": {
      "shared/*": ["../shared/*"]
    }
  },
  "include": ["./src/**/*"],
  "references": [{ "path": "../shared" }]
}
```

The final thing we need to to is build the `shared` project, so TypeScript can access the `.d.ts` files. We can compile a project and all of its references by using the `--build` or `-b` command line flag for tsc while inside the client folder.

```sh
tsc -b
```

This first compiles the `.d.ts` files in the `shared` project, and then builds the `client` project. Now, when I import from 'shared/commonTypes', TypeScript will recognize the connection, but when I build my `client` project, I won't have a messy file structure.

￼