export type List = {
  title: string;
};

export type IList = List & {
  id: number;
  created_at: string;
  slug_name: string;
};
