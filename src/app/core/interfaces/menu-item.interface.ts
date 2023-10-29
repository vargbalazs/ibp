export interface MenuItem {
  text: string;
  icon?: string;
  selected?: boolean;
  expanded?: boolean;
  parent?: boolean;
  level?: number;
  id?: string;
  parentId?: string;
  items?: MenuItem[];
  routePath?: string;
  translateId?: string;
}
