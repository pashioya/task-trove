export type Board = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  name: string;
};

export type Column = {
  id: string;
  title: string;
  type: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Task = {
  id: string;
  name: string;
  lat: number;
  long: number;
};
