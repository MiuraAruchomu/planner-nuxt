import type { SideMenuUnauthorizedItem } from './SideMenu.type';

export interface SideMenuAuthorizedItem {
  name: string;
  path: string;
}

export interface SideMenuItems {
  AUTHORIZED: Record<string, SideMenuAuthorizedItem>;
  UNAUTHORIZED: SideMenuUnauthorizedItem[];
}

export interface UnauthorizedListItemProps {
  name: string;
}

export interface AuthorizedListItemProps extends UnauthorizedListItemProps {
  path: string;
  index: number;
}
