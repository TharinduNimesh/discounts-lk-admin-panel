export default defineAppConfig({
  ui: {
    primary: "orange",
    gray: "zinc",
    icons: {
      dynamic: true, // use icones directly from icones.js.org
    },
    input: {
      default: {
        size: "lg",
        color: "gray",
      },
    },
    button: {
      default: {
        size: "lg",
      },
    },
    selectMenu: {
      default: {
        size: "lg",
        color: "gray",
      },
    },
    formGroup: {
      default: {
        size: "lg",
      },
    },
  },
});
