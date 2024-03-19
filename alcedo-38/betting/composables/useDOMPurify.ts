import DOMPurify, { type Config } from "isomorphic-dompurify";

export const useDOMPurify = (html: string, config?: Config) =>
  DOMPurify.sanitize(html, {
    ...config,
    USE_PROFILES: { html: true },
  });
