export interface Item {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
}

export type Items = Item[];
