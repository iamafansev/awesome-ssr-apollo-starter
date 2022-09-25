require("dotenv").config({ path: ".env.development" });

const eslintDisablePligin = { add: { content: "/* eslint-disable */" } };

module.exports = {
  overwrite: true,
  schema: process.env.RAZZLE_API_ENDPOINT,
  documents: "src/**/*.graphql",
  generates: {
    "src/client/types/graphql.tsx": {
      plugins: [eslintDisablePligin, "typescript"],
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".graphql-generated.ts",
        baseTypesPath: "client/types/graphql.tsx",
      },
      plugins: [
        eslintDisablePligin,
        "typescript-operations",
        "typed-document-node",
      ],
    },
  },
};
