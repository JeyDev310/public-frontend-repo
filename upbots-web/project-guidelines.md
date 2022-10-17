# Project technical stack
  1. [Vue.ts 3 (composition API)](https://v3.vuejs.org/)
      - [Vuex4](https://next.vuex.vuejs.org/) (powered by [typed-vuex](https://typed-vuex.roe.dev/getting-started/getting-started-vue) for better TS support)
      - Helper utils - [VueUse](https://vueuse.org/)
      - Responsive layout - [Vue3-Mq](https://github.com/craigrileyuk/vue3-mq#readme)
      - Charts [Vue3 wrapper for ECharts](https://github.com/ecomfe/vue-echarts)
      - [VeeValidate](https://vee-validate.logaretm.com/v4/) - for from validation powered by [Yup](https://github.com/jquense/yup) (object schema validation)

  2. [Tailwind UI](https://tailwindcss.com/) (for all UI things)
      - CSS, SASS(SCSS) is supported as well
      - [Configuration file](https://github.com/upbots/front/blob/develop/tailwind.config.js)

  3. [Jest](https://jestjs.io/) via [Vue Test Utils](https://next.vue-test-utils.vuejs.org/)

# Development
  1. The cock-book for developers "Playgroud"
      ```bash
      > npm run serve
      ```
      will open development mode in `http://localhost:8080/` enter manually `http://localhost:8080/playground`. There you go, feel free to investigate it, this page contains documentation for each reusable Component for the project with all states and behaviors.

# CSS Style guide (keep props in a certain sequence)
.selector {
- Positioning:
  - position: absolute;
  - z-index: 10;
  - top: 0;
  - right: 0;
- Display & Box Model:
  - display: inline-block;
  - overflow: hidden;
  - box-sizing: border-box;
  - width: 100px;
  - height: 100px;
  - padding: 10px;
  - border: 1px solid #333;
- Color:
  - background: #000;
  - color: #fff;
- Text:
  - font-family: sans-serif;
  - font-size: 16px;
  - line-height: 1.4;
  - text-align: right;



# Project structure

    src
    ├── assets
    │   │── images                     # global images 
    │   └── styles                     # base styles,  /base, /components, /utils, /vendors, main.scss
    │ 
    ├── components
    │   ├── stateless                  # Only generic UI components: buttons, tables, 
    │       ├── hoc                    # High Order Components folder
    │         ├── AppButton.vue
    │         ├── AppCard.vue
    │         ├── AppModal.vue
    │   └── Haeder.vue                # BusinessLogic component shared across the application.
    │
    ├── core 
    │   │── utils  
    │       ├── localstorage.utils.ts  # Some generic utility functions related to specific object: e.g.: localstorage
    │       └── tracking.utils.ts      # Analytics and tracking functions
    │   └── helpers.ts                 # Combination of separated helper functions like prefentBodyScroll()
    │  
    ├── layouts                        # Nuxt-like layouts
    │   ├── BlankLayout.vue            # Blank layout (no header, no sidebar)
    │   └── DefaultLayout.vue          # Default layout for most of the pages
    │   
    ├── mixins (for Vue 2 only)                         
    │   ├── index.ts                   # Export all 
    │   └── leave-route.mixin.ts       # Global mixin that being used across the application
    │ 
    ├── plugins                    
    │   ├── index.ts                   # Import all plugins
    │   ├── charts.plugin.ts           # Charts plugin
    │   ├── filters.ts                 # Vue core filters
    │   └── directives.ts              # Vue core directives
    │ 
    ├── router         
    │   ├── index.ts                   # Export router, routeNames, invoke guards
    │   ├── route-guard.ts             # Declare all router guards
    │   └── route-names.ts             # Declare all route names object
    │ 
    ├── services     
    │   ├── index.ts                   # Export * from all services accross an app
    │   ├── api.service.ts             # Axios config, interceptors. If needed may be moved to folder
    │   └── auth.service.ts            # Auth service - user data, tokens used across the app, settings.
    │ 
    ├── store
    │   ├── modules                        
    │       ├── index.ts               # Export * from all vuex modules accross an app
    │       └── auth.store.ts          # Auth module - user data, tokens used across the app, settings.
    │   ├── index.ts                   # Import all modules and initialize store
    │ 
    ├── views
    │   ├── home     
    │   │   ├── components  
    │   │   │   └── MyBotsCard.vue     # Components, related only to home pages        
    │   │   ├── home.routes.ts         # Route file with declaration for all settings pages.
    │   │   ├── home.service.ts        # Service with API for settings pages 
    │   │   ├── Home.vue           # Settings root page
    │   └── ...
    ├── playground
    │   ├── elementd           
    │   │   ├── PgButtons.vue          # Docs / API / States for AppButton reusable component.
    │   │   ├── PgButtonsGroup.vue     # Docs / API / States for AppButtonsGroup reusable component.
    │   │   └── ...
    │   ├── playgroud.routes.ts        # Auto generator for all playgroud items
    │   └── Playgroud.vue              # Main playgroud route Component       
    └──