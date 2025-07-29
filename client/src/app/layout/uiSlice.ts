import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const storedDarkMode = localStorage.getItem('darkMode');
  // If darkMode is not set in localStorage, default to true (dark mode)
  return storedDarkMode ? JSON.parse(storedDarkMode) : true;
}

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isLoading: false,
        darkMode: getInitialDarkMode(),
    },
    reducers: {
        startLoading: (state) => {
        state.isLoading = true;
        },
        stopLoading: (state) => {
        state.isLoading = false;
        },
        setDarkMode: (state) => {
            localStorage.setItem('darkMode', JSON.stringify(!state.darkMode));
            // This will toggle the dark mode state and store it in localStorage
            state.darkMode = !state.darkMode;
        }
    },
})

export const { startLoading, stopLoading, setDarkMode } = uiSlice.actions;