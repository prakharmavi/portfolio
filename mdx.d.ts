declare module "*.mdx" {
  import type { ComponentPropsWithoutRef, ComponentType } from "react";

  type MDXProps = ComponentPropsWithoutRef<"div"> & {
    components?: Record<string, ComponentType<unknown>>;
    [key: string]: unknown;
  };

  const MDXComponent: ComponentType<MDXProps>;

  export default MDXComponent;
  export const metadata: Record<string, unknown> | undefined;
}
