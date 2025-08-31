// example: dynamicImport("./onServerSideLoad")
export function serverImport<T extends any[], R>( //T - arguments, R - return type
  loader: () => Promise<{ default?: any; [k: string]: any }>,
  functionName?: string
) {
  return async (...args: T) => {
    if (typeof window !== "undefined") return undefined as unknown as R;

    const mod = await loader();
    if (functionName) {
      return mod[functionName](...args);
    } else {
      return mod.default ? mod.default(...args) : undefined;
    }
  };
}
