import type { SideMenuConfig } from './SideMenu.interface';

export const SIDEMENU: SideMenuConfig = {
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

export const TRANSITION_TIMINGS: Record<string, number> = {
  'sign in': 0.65,
  'sign up': 0.675,
  'sign out': 0.675,
};
