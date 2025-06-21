export interface SideMenuItem {
  name: string;
  path: string;
}

export interface SideMenuConfig {
  AUTHORIZED: Record<string, SideMenuItem>;
  UNAUTHORIZED: string[];
}

export interface UnauthorizedListItemProps {
  name: string;
}

export interface AuthorizedListItemProps extends UnauthorizedListItemProps {
  path: string;
  index: number;
}
