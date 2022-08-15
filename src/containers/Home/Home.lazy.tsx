import loadable from "@loadable/component";

export const HomePageLazy = loadable(() => import("./Home"), {
  resolveComponent: (module) => module.Home,
  ssr: true,
  fallback: undefined,
});
