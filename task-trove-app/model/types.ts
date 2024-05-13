export type Board = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  name: string;
  // TODO: ISNT THIS ALSO NEEDED?
  // column_id: string;
  // board_id: string;
};

export type Column = {
  id: string;
  title: string;
  type: string;
  // TODO: ISNT THIS ALSO NEEDED?
  // board_id: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};
