import type { SideMenuItems } from './SideMenu.interface';
import type { TransitionTimingsItem } from './SideMenu.type';

export const SIDEMENU_ITEMS: SideMenuItems = {
  AUTHORIZED: {
    CALENDAR: {
      name: 'calendar',
      path: '/calendar',
    },
    TASK_MANAGER: {
      name: 'task manager',
      path: '/task-manager',
    },
    HABIT_TRACKER: {
      name: 'habit tracker',
      path: '/habit-tracker',
    },
    STATISTICS: {
      name: 'statistics',
      path: '/statistics',
    },
  },
  UNAUTHORIZED: ['sign in', 'sign up'],
};

export const TRANSITION_TIMINGS: Record<TransitionTimingsItem, number> = {
  'sign in': 0.65,
  'sign up': 0.675,
  'sign out': 0.675,
};
