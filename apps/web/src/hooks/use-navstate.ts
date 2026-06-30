import { create } from "zustand";

/**
 * useNavbarState (Zustand store hook)
 *
 * This hook manages the open/close state of a navigation bar (navbar)
 * in a React application.
 *
 * It provides a simple global UI state controller for toggling the navbar,
 * typically used in responsive layouts (e.g. mobile hamburger menus).
 *
 * Purpose:
 * - Control whether the navbar is open or closed from anywhere in the app
 * - Provide consistent behavior for open/close/toggle actions
 * - Avoid prop drilling for UI state shared across components
 *
 * State behavior:
 * - `isNavOpen` determines whether the navbar is currently visible/open
 * - `openNavBar()` sets the navbar state to open
 * - `closeNavBar()` sets the navbar state to closed
 * - `toggleNavBar()` flips the current state
 *
 * Note:
 * This state is in-memory only and resets on page refresh.
 */
interface NavbarState {
  isNavOpen: boolean;
  openNavBar: () => void;
  closeNavBar: () => void;
  toggleNavBar: () => void;
}

export const useNavbarState = create<NavbarState>()((set) => ({
  isNavOpen: false,
  openNavBar: () => set({ isNavOpen: true }),
  closeNavBar: () => set({ isNavOpen: false }),
  toggleNavBar: () => set((prev) => ({ isNavOpen: !prev.isNavOpen })),
}));
