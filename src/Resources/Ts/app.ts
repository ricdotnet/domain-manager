import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import ApplicationLayout from './Layouts/ApplicationLayout.vue';

// this will show the ApplicationLayout as the default layout
// if no layout is defined on the component.
createInertiaApp({
  id     : 'app',
  resolve: name => {
    const page  = require(`./Pages/${name}.vue`).default;
    page.layout = page.layout || ApplicationLayout;
    return page;
  },
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .mount(el);
  },
});

