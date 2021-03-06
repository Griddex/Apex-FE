export interface RenderTree {
  id: string;
  name: string;
  path?: string;
  children?: RenderTree[];
}
