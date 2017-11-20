Section 3: Understanding the TypeScript Compiler
================================================

How Code gets compiled
----------------------
1. By default the TypeScript compiler just rise up warnings.

Changing the compiler behavior on errors
----------------------------------------
1. In the file `tsconfig.json` you can change the default TS's compiler configuration 
2. In`compilerOptions` you can add the key:value `noEmitOnError: true` to force the TS compiler to don't create the `.js` file when exist errors

Debugging your TS code using source maps
----------------------------------------
1. In`compilerOptions` you can add modify the default `sourceMap: false ` to `sourceMap: true`. This configuration allow us to debugging directly in the `.ts` file from browser's developer tools

Avoiding implicit "any"
-----------------------
1. If you doesn't set a type for a variable, by default TS assign the *any* type to the variable. to avoid that, you can set the property `noImplicitAny: false`

More compiler options
---------------------
1. Please check the (tsconfig.json documentation)[www.typescriptlang.org/docs/handbook/tsconfig-json.html]

Compile improvements with TS 2.0
---------------------------------
1. Add rule for never return values that are still not assigned
2. Add rule for never used arguments