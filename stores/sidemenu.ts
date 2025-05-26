import type { SideMenuItem } from './types';

export const useSidemenuStore = defineStore('sidemenu-store', () => {
  const items: Record<string, SideMenuItem> = reactive({
    calendar: {
      path: '/calendar',
    },
    'task manager': {
      path: '/task-manager',
    },
    'habit tracker': {
      path: '/habit-tracker',
    },
    statistics: {
      path: '/statistics',
    },
  });
  const isVisible = ref<boolean>(false);

  function toggleVisible(): void {
    isVisible.value = !isVisible.value;
  }

  function closeMenu(): void {
    isVisible.value = false;
  }

  return {
    items,
    isVisible,
    toggleVisible,
    closeMenu,
  };
});
