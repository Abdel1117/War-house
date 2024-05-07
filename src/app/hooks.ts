import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./store"

// This is here when we use our custom App instead of useDispatch and useSelector

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()