import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueGoogleMaps from "@fawmi/vue-google-maps";

loadFonts();

createApp(App)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyD3FHJOwI8e1dL6EOMZwkoPXGQRWj424Z8",
      libraries: "places",
    },
  })
  .use(vuetify)
  .mount("#app");
