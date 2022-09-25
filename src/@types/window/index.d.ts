import { Resource } from "i18next";
import { NormalizedCacheObject } from "@apollo/client";

declare global {
  interface Window {
    initialI18nStore: Resource;
    initialLanguage: string;
    apolloState: NormalizedCacheObject;
  }
}
