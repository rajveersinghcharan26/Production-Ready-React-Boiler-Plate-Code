/**
 * Typed Redux hooks.
 * Use these hooks throughout the app instead of plain `useDispatch` and `useSelector`.
 */

import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './index';

/**
 * Typed useDispatch hook.
 * Use this instead of plain `useDispatch` for type safety.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed useSelector hook.
 * Use this instead of plain `useSelector` for type safety.
 */
export const useAppSelector = useSelector.withTypes<RootState>();
