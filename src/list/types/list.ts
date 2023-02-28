export type List = {
  title: string;
};

export type IList = List & {
  id: number;
  createdAt: string;
  slugName: string;
};
