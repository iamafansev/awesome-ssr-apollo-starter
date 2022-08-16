import loadable from "@loadable/component";

export const AboutPageLazy = loadable(() => import("./About"), {
  resolveComponent: (module) => module.About,
  fallback: undefined,
});
