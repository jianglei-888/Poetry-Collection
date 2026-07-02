// vite.config.ts
import { defineConfig } from "file:///C:/Users/LENOVO/CodeBuddy/Projects/rxx/react-app/node_modules/vitest/dist/config.js";
import react from "file:///C:/Users/LENOVO/CodeBuddy/Projects/rxx/react-app/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tailwindcss from "file:///C:/Users/LENOVO/CodeBuddy/Projects/rxx/react-app/node_modules/@tailwindcss/vite/dist/index.mjs";
import tsConfigPaths from "file:///C:/Users/LENOVO/CodeBuddy/Projects/rxx/react-app/node_modules/vite-tsconfig-paths/dist/index.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
var __vite_injected_original_import_meta_url = "file:///C:/Users/LENOVO/CodeBuddy/Projects/rxx/react-app/vite.config.ts";
var vite_config_default = defineConfig(async () => {
  const checker = (await import("file:///C:/Users/LENOVO/CodeBuddy/Projects/rxx/react-app/node_modules/vite-plugin-checker/dist/main.js")).default;
  const restartOnDepsChange = () => ({
    name: "restart-on-deps-change",
    configureServer(server) {
      const configDir = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
      const files = [
        "vite.config.ts",
        "package.json",
        "package-lock.json",
        "yarn.lock",
        "pnpm-lock.yaml"
      ].map((f) => path.resolve(configDir, f));
      server.watcher.add(files);
      const handler = (changedPath) => {
        const abs = path.resolve(changedPath);
        if (files.includes(abs)) server.restart();
      };
      server.watcher.on("change", handler);
      server.watcher.on("add", handler);
      server.watcher.on("unlink", handler);
    }
  });
  const dynamicManifest = () => ({
    name: "dynamic-manifest",
    configureServer(server) {
      const require2 = createRequire(__vite_injected_original_import_meta_url);
      let pkg = {};
      try {
        pkg = require2("./package.json");
      } catch {
      }
      const appName = process.env.VITE_APP_NAME || pkg.name || "App";
      const appDescription = process.env.VITE_APP_DESCRIPTION || pkg.description || "";
      const manifest = buildManifest(appName, appDescription);
      server.middlewares.use((req, res, next) => {
        if (req.url === "/site.webmanifest") {
          res.setHeader("Content-Type", "application/manifest+json");
          res.end(JSON.stringify(manifest));
          return;
        }
        next();
      });
    },
    generateBundle() {
      const require2 = createRequire(__vite_injected_original_import_meta_url);
      let pkg = {};
      try {
        pkg = require2("./package.json");
      } catch {
      }
      const appName = process.env.VITE_APP_NAME || pkg.name || "App";
      const appDescription = process.env.VITE_APP_DESCRIPTION || pkg.description || "";
      const manifest = buildManifest(appName, appDescription);
      this.emitFile({ type: "asset", fileName: "site.webmanifest", source: JSON.stringify(manifest, null, 2) });
    }
  });
  function buildManifest(name, description) {
    return {
      name,
      short_name: name,
      description,
      icons: [
        { src: "/img/favicon/16x16.png", sizes: "16x16", type: "image/png" },
        { src: "/img/favicon/32x32.png", sizes: "32x32", type: "image/png" },
        { src: "/img/favicon/180x180.png", sizes: "180x180", type: "image/png" },
        { src: "/img/favicon/192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/img/favicon/512x512.png", sizes: "512x512", type: "image/png" }
      ],
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#000000",
      theme_color: "#000000"
    };
  }
  const srcPath = fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url));
  return {
    build: { outDir: "dist" },
    plugins: [
      react(),
      tailwindcss(),
      tsConfigPaths(),
      restartOnDepsChange(),
      dynamicManifest(),
      checker({ typescript: true })
    ],
    resolve: {
      alias: {
        "@": srcPath,
        "@/": `${srcPath}/`
      }
    },
    server: { port: 3e3 },
    test: {
      alias: { "@/": `${srcPath}/` },
      environment: "jsdom",
      include: ["**/*.test.*", "**/*.spec.*"],
      globals: true,
      setupFiles: ["./setup-tests.ts"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMRU5PVk9cXFxcQ29kZUJ1ZGR5XFxcXFByb2plY3RzXFxcXHJ4eFxcXFxyZWFjdC1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExFTk9WT1xcXFxDb2RlQnVkZHlcXFxcUHJvamVjdHNcXFxccnh4XFxcXHJlYWN0LWFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTEVOT1ZPL0NvZGVCdWRkeS9Qcm9qZWN0cy9yeHgvcmVhY3QtYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZydcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJ1xyXG5pbXBvcnQgdHNDb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0IHsgY3JlYXRlUmVxdWlyZSB9IGZyb20gJ25vZGU6bW9kdWxlJ1xyXG5cclxuLy8gV2ViLW9ubHkgc3RhcnRlcjogbm8gRWxlY3Ryb24gcGx1Z2lucyByZWZlcmVuY2VkLlxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IGNoZWNrZXIgPSAoYXdhaXQgaW1wb3J0KCd2aXRlLXBsdWdpbi1jaGVja2VyJykpLmRlZmF1bHRcclxuXHJcbiAgLy8gSW5saW5lIHBsdWdpbjogcmVzdGFydCBkZXYgc2VydmVyIHdoZW4gZGVwZW5kZW5jeSBtYW5pZmVzdHMgY2hhbmdlIChWaXRlIHY1IGNvbXBhdGlibGUpXHJcbiAgY29uc3QgcmVzdGFydE9uRGVwc0NoYW5nZSA9ICgpID0+ICh7XHJcbiAgICBuYW1lOiAncmVzdGFydC1vbi1kZXBzLWNoYW5nZScsXHJcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyOiBhbnkpIHtcclxuICAgICAgY29uc3QgY29uZmlnRGlyID0gcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcclxuXHJcbiAgICAgIGNvbnN0IGZpbGVzID0gW1xyXG4gICAgICAgICd2aXRlLmNvbmZpZy50cycsXHJcbiAgICAgICAgJ3BhY2thZ2UuanNvbicsXHJcbiAgICAgICAgJ3BhY2thZ2UtbG9jay5qc29uJyxcclxuICAgICAgICAneWFybi5sb2NrJyxcclxuICAgICAgICAncG5wbS1sb2NrLnlhbWwnLFxyXG4gICAgICBdLm1hcChmID0+IHBhdGgucmVzb2x2ZShjb25maWdEaXIsIGYpKVxyXG5cclxuICAgICAgc2VydmVyLndhdGNoZXIuYWRkKGZpbGVzKVxyXG4gICAgICBjb25zdCBoYW5kbGVyID0gKGNoYW5nZWRQYXRoOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBjb25zdCBhYnMgPSBwYXRoLnJlc29sdmUoY2hhbmdlZFBhdGgpXHJcbiAgICAgICAgaWYgKGZpbGVzLmluY2x1ZGVzKGFicykpIHNlcnZlci5yZXN0YXJ0KClcclxuICAgICAgfVxyXG4gICAgICBzZXJ2ZXIud2F0Y2hlci5vbignY2hhbmdlJywgaGFuZGxlcilcclxuICAgICAgc2VydmVyLndhdGNoZXIub24oJ2FkZCcsIGhhbmRsZXIpXHJcbiAgICAgIHNlcnZlci53YXRjaGVyLm9uKCd1bmxpbmsnLCBoYW5kbGVyKVxyXG4gICAgfSxcclxuICB9KVxyXG5cclxuICAvLyBEeW5hbWljIHNpdGUud2VibWFuaWZlc3QgZnJvbSBlbnYgKGRldiArIGJ1aWxkKVxyXG4gIGNvbnN0IGR5bmFtaWNNYW5pZmVzdCA9ICgpID0+ICh7XHJcbiAgICBuYW1lOiAnZHluYW1pYy1tYW5pZmVzdCcsXHJcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyOiBhbnkpIHtcclxuICAgICAgY29uc3QgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoaW1wb3J0Lm1ldGEudXJsKVxyXG4gICAgICBsZXQgcGtnOiBhbnkgPSB7fVxyXG4gICAgICB0cnkgeyBwa2cgPSByZXF1aXJlKCcuL3BhY2thZ2UuanNvbicpIH0gY2F0Y2gge31cclxuICAgICAgY29uc3QgYXBwTmFtZSA9IHByb2Nlc3MuZW52LlZJVEVfQVBQX05BTUUgfHwgcGtnLm5hbWUgfHwgJ0FwcCdcclxuICAgICAgY29uc3QgYXBwRGVzY3JpcHRpb24gPSBwcm9jZXNzLmVudi5WSVRFX0FQUF9ERVNDUklQVElPTiB8fCBwa2cuZGVzY3JpcHRpb24gfHwgJydcclxuICAgICAgY29uc3QgbWFuaWZlc3QgPSBidWlsZE1hbmlmZXN0KGFwcE5hbWUsIGFwcERlc2NyaXB0aW9uKVxyXG5cclxuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAocmVxLnVybCA9PT0gJy9zaXRlLndlYm1hbmlmZXN0Jykge1xyXG4gICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL21hbmlmZXN0K2pzb24nKVxyXG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeShtYW5pZmVzdCkpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dCgpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2VuZXJhdGVCdW5kbGUoKSB7XHJcbiAgICAgIGNvbnN0IHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKGltcG9ydC5tZXRhLnVybClcclxuICAgICAgbGV0IHBrZzogYW55ID0ge31cclxuICAgICAgdHJ5IHsgcGtnID0gcmVxdWlyZSgnLi9wYWNrYWdlLmpzb24nKSB9IGNhdGNoIHt9XHJcbiAgICAgIGNvbnN0IGFwcE5hbWUgPSBwcm9jZXNzLmVudi5WSVRFX0FQUF9OQU1FIHx8IHBrZy5uYW1lIHx8ICdBcHAnXHJcbiAgICAgIGNvbnN0IGFwcERlc2NyaXB0aW9uID0gcHJvY2Vzcy5lbnYuVklURV9BUFBfREVTQ1JJUFRJT04gfHwgcGtnLmRlc2NyaXB0aW9uIHx8ICcnXHJcbiAgICAgIGNvbnN0IG1hbmlmZXN0ID0gYnVpbGRNYW5pZmVzdChhcHBOYW1lLCBhcHBEZXNjcmlwdGlvbilcclxuICAgICAgdGhpcy5lbWl0RmlsZSh7IHR5cGU6ICdhc3NldCcsIGZpbGVOYW1lOiAnc2l0ZS53ZWJtYW5pZmVzdCcsIHNvdXJjZTogSlNPTi5zdHJpbmdpZnkobWFuaWZlc3QsIG51bGwsIDIpIH0pXHJcbiAgICB9LFxyXG4gIH0pXHJcblxyXG4gIGZ1bmN0aW9uIGJ1aWxkTWFuaWZlc3QobmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lLFxyXG4gICAgICBzaG9ydF9uYW1lOiBuYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgaWNvbnM6IFtcclxuICAgICAgICB7IHNyYzogJy9pbWcvZmF2aWNvbi8xNngxNi5wbmcnLCBzaXplczogJzE2eDE2JywgdHlwZTogJ2ltYWdlL3BuZycgfSxcclxuICAgICAgICB7IHNyYzogJy9pbWcvZmF2aWNvbi8zMngzMi5wbmcnLCBzaXplczogJzMyeDMyJywgdHlwZTogJ2ltYWdlL3BuZycgfSxcclxuICAgICAgICB7IHNyYzogJy9pbWcvZmF2aWNvbi8xODB4MTgwLnBuZycsIHNpemVzOiAnMTgweDE4MCcsIHR5cGU6ICdpbWFnZS9wbmcnIH0sXHJcbiAgICAgICAgeyBzcmM6ICcvaW1nL2Zhdmljb24vMTkyeDE5Mi5wbmcnLCBzaXplczogJzE5MngxOTInLCB0eXBlOiAnaW1hZ2UvcG5nJyB9LFxyXG4gICAgICAgIHsgc3JjOiAnL2ltZy9mYXZpY29uLzUxMng1MTIucG5nJywgc2l6ZXM6ICc1MTJ4NTEyJywgdHlwZTogJ2ltYWdlL3BuZycgfVxyXG4gICAgICBdLFxyXG4gICAgICBzdGFydF91cmw6ICcvJyxcclxuICAgICAgc2NvcGU6ICcvJyxcclxuICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxyXG4gICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgIHRoZW1lX2NvbG9yOiAnIzAwMDAwMCdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHJJREU6IEV4cGxpY2l0IHNyYyBhbGlhcyBwYXRoIGZvciBib3RoIHJlc29sdmUgYW5kIHZpdGVzdCB0ZXN0LmFsaWFzXHJcbiAgY29uc3Qgc3JjUGF0aCA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYnVpbGQ6IHsgb3V0RGlyOiAnZGlzdCcgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgcmVhY3QoKSxcclxuICAgICAgdGFpbHdpbmRjc3MoKSxcclxuICAgICAgdHNDb25maWdQYXRocygpLFxyXG4gICAgICByZXN0YXJ0T25EZXBzQ2hhbmdlKCksXHJcbiAgICAgIGR5bmFtaWNNYW5pZmVzdCgpLFxyXG4gICAgICBjaGVja2VyKHsgdHlwZXNjcmlwdDogdHJ1ZSB9KSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiBzcmNQYXRoLFxyXG4gICAgICAgICdALyc6IGAke3NyY1BhdGh9L2AsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7IHBvcnQ6IDMwMDAgfSxcclxuICAgIHRlc3Q6IHtcclxuICAgICAgYWxpYXM6IHsgJ0AvJzogYCR7c3JjUGF0aH0vYCB9LFxyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgaW5jbHVkZTogWycqKi8qLnRlc3QuKicsICcqKi8qLnNwZWMuKiddLFxyXG4gICAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgICBzZXR1cEZpbGVzOiBbJy4vc2V0dXAtdGVzdHMudHMnXSxcclxuICAgIH0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdWLFNBQVMsb0JBQW9CO0FBQzdXLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxxQkFBcUI7QUFOdUwsSUFBTSwyQ0FBMkM7QUFTdFEsSUFBTyxzQkFBUSxhQUFhLFlBQVk7QUFDdEMsUUFBTSxXQUFXLE1BQU0sT0FBTyx3R0FBcUIsR0FBRztBQUd0RCxRQUFNLHNCQUFzQixPQUFPO0FBQUEsSUFDakMsTUFBTTtBQUFBLElBQ04sZ0JBQWdCLFFBQWE7QUFDM0IsWUFBTSxZQUFZLEtBQUssUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFFN0QsWUFBTSxRQUFRO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLEVBQUUsSUFBSSxPQUFLLEtBQUssUUFBUSxXQUFXLENBQUMsQ0FBQztBQUVyQyxhQUFPLFFBQVEsSUFBSSxLQUFLO0FBQ3hCLFlBQU0sVUFBVSxDQUFDLGdCQUF3QjtBQUN2QyxjQUFNLE1BQU0sS0FBSyxRQUFRLFdBQVc7QUFDcEMsWUFBSSxNQUFNLFNBQVMsR0FBRyxFQUFHLFFBQU8sUUFBUTtBQUFBLE1BQzFDO0FBQ0EsYUFBTyxRQUFRLEdBQUcsVUFBVSxPQUFPO0FBQ25DLGFBQU8sUUFBUSxHQUFHLE9BQU8sT0FBTztBQUNoQyxhQUFPLFFBQVEsR0FBRyxVQUFVLE9BQU87QUFBQSxJQUNyQztBQUFBLEVBQ0Y7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
