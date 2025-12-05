import type { ReactElement } from 'react';

type AntdRenderHandler = (
  node: ReactElement,
  container: Element | DocumentFragment,
) => () => void;

declare module 'antd' {
  /**
   * Compatibility shim to allow React 19's `createRoot` to drive Ant Design's
   * imperative render helpers without triggering type deprecation warnings.
   * Remove once upgrading to Ant Design v6 (which targets React 19 natively).
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export function unstableSetRender(render?: AntdRenderHandler): AntdRenderHandler;
}
