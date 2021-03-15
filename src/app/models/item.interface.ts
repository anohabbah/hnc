export interface Item {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
}

export interface Items {
  offset: number;
  limit: number;
  total?: number;
  results: Item[];
}
