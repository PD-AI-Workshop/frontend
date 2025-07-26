import { makeAutoObservable } from "mobx";

export class ThemeStore {
    isDarkMode = false;
    isInitialized = false

    constructor() {
        makeAutoObservable(this);
    }

    initialize() {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            this.isDarkMode = savedTheme === "dark";
            this.applyTheme();
            this.isInitialized = true;
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
        }
        this.applyTheme();
    }

    private applyTheme() {
        if (typeof document !== "undefined") {
            if (this.isDarkMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }
}

export default ThemeStore;