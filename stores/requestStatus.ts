export const useRequestStatusStore = defineStore("requestStatus-store", () => {
  const status = ref<"idle" | "loading" | "success" | "error">("idle");

  function setStatus(
    newStatus: "idle" | "loading" | "success" | "error"
  ): void {
    status.value = newStatus;
  }

  return {
    status,
    setStatus,
  };
});
