import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    // 👇 Así Vue no trata a gmpx- como un componente
                    isCustomElement: (tag) => tag.startsWith("gmpx-"),
                },
            },
        }),
    ],
});
