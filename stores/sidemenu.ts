export const useSidemenuStore = defineStore('sidemenu-store', () => {
  const isVisible = ref<boolean>(false);

  function toggleVisible(): void {
    isVisible.value = !isVisible.value;
  }

  return {
    isVisible,
    toggleVisible,
  };
});
