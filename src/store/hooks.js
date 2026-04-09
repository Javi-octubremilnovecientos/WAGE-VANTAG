import { useDispatch, useSelector } from "react-redux";

/**
 * Hooks tipados para usar con Redux
 * Usar estos en lugar de useDispatch/useSelector directamente
 */
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
