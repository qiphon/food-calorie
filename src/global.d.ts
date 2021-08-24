// for css module
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface ProcessEnv {
  readonly NODE_ENV: "development" | "production" | "test";
  readonly PUBLIC_URL: string;
  readonly REACT_APP_BASE_URL: string;
}
