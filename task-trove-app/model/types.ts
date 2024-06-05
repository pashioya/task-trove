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

export type TaskItem = {
  id: string;
  name: string;
  column_values: ColumnValue[];
};

type ColumnValue = {
  id: string;
  value: string | null;
  text: string | null;
};

export type Task = {
  id: string;
  name: string;
  lat: number;
  long: number;
  address: string;
  changedAt: string;
  distanceTo: number;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};
