export const useModalsStore = defineStore('modals-store', () => {
  const activeModals = ref<Map<string, boolean>>(new Map());
  const authenticationViewSwitcherItems = ref<string[]>(['sign in', 'sign up']);
  const activeAuthenticationView = ref<string>('sign in');

  function openModal(modal: string, title?: string): void {
    document.documentElement.style.overflowY = 'hidden';
    activeModals.value.set(modal, true);

    if (modal === 'authentication' && title) {
      activeAuthenticationView.value = title;
    }
  }

  function closeModal(modal: string): void {
    activeModals.value.delete(modal);
    document.documentElement.style.overflowY = 'auto';
  }

  function changeActiveAuthenticationView(value: string): void {
    activeAuthenticationView.value = value;
  }

  return {
    activeModals,
    authenticationViewSwitcherItems,
    activeAuthenticationView,
    openModal,
    closeModal,
    changeActiveAuthenticationView,
  };
});
