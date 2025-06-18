import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
export declare function assertsExist<T>(item?: T): asserts item is T;
export declare const sleep: (timeout?: number) => Promise<void>;
declare const customRender: (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
export declare function renderHook<T>(func: () => T): {
    result: React.RefObject<T>;
};
/**
 * Pure render like `@testing-lib` render which will not wrap with StrictMode.
 *
 * Please only use with render times times of memo usage case.
 */
declare const pureRender: typeof render;
export { pureRender, customRender as render };
export declare const triggerResize: (target: Element) => void;
/**
 * Wait for a time delay. Will wait `advanceTime * times` ms.
 *
 * @param advanceTime Default 1000
 * @param times Default 20
 */
export declare function waitFakeTimer(advanceTime?: number, times?: number): Promise<void>;
export * from '@testing-library/react';
