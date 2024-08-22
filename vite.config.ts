import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import UnoCss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl(), UnoCss()],
  build: {
    outDir: "./docs",
  },
});
