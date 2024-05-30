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

export type Task = {
  id: string;
  name: string;
  column_values: ColumnValue[];
};

type ColumnValue = {
  id: string;
  value: string;
  text: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};
