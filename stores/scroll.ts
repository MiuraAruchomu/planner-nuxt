export const useScrollStore = defineStore('scroll-store', () => {
  const scrolledEl = ref<HTMLElement | null>(null);
  const isScrolled = ref<boolean>(false);
  const scrolledValue = ref<number>(0);

  function handleScroll(): void {
    if (scrolledEl.value) {
      scrolledValue.value = scrolledEl.value.scrollTop;
      isScrolled.value = scrolledValue.value > 0;
    }
  }

  function setScrolledEl(node: HTMLElement): void {
    scrolledEl.value = node;
  }

  function resetScrolledEl(): void {
    scrolledEl.value = null;
    isScrolled.value = false;
    scrolledValue.value = 0;
  }

  watch(scrolledEl, (el, oldEl) => {
    if (oldEl) {
      oldEl.removeEventListener('scroll', handleScroll);
    }

    if (el) {
      el.addEventListener('scroll', handleScroll);
    }
  });

  return {
    scrolledEl,
    isScrolled,
    setScrolledEl,
    resetScrolledEl,
  };
});
