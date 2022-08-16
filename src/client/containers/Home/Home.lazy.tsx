import loadable from "@loadable/component";

export const HomePageLazy = loadable(() => import("./Home"), {
  resolveComponent: (module) => module.Home,
  fallback: undefined,
});
