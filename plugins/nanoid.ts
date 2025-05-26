import { nanoid } from "nanoid";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      nanoid,
    },
  };
});
