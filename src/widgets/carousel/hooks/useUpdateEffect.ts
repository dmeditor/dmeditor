import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * Runs an effect only when the dependencies have changed, skipping the
 * initial "on mount" run. Caution, if the dependency list never changes,
 * the effect is **never run**
 *
 * ```ts
 *  const ref = useRef<HTMLInput>(null);
 *
 *  // focuses an element only if the focus changes, and not on mount
 *  useUpdateEffect(() => {
 *    const element = ref.current?.children[focusedIdx] as HTMLElement
 *
 *    element?.focus()
 *
 *  }, [focusedIndex])
 * ```
 * @param effect An effect to run on mount
 *
 * @category effects
 */
function useUpdateEffect(fn: EffectCallback, deps: DependencyList) {
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    return fn();
  }, deps);
}

export default useUpdateEffect;
