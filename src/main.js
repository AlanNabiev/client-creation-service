import { createApp } from "vue";
import App from "./App.vue";
import registerBaseComponents from "./helpers/registerBaseComponents";

export const app = createApp(App);

// Register base components
registerBaseComponents(app);

document.addEventListener("DOMContentLoaded", () => {
  app.mount("#app");
});
