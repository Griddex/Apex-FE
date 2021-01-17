export interface IProtectedRoute {
  path: string;
  roles: string[];
  component: React.LazyExoticComponent<() => JSX.Element>;
}
