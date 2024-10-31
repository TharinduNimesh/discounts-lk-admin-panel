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
    select: {
      default: {
        color: "gray",
        size: "lg"
      }
    },
    formGroup: {
      default: {
        size: "lg",
      },
    },
  },
});
