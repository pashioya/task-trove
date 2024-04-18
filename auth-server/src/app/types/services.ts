import type {
  ItemId,
  BoardId,
  ColumnId,
  Token,
} from "@tryve-apps/monday-server-sdk/types";

export type GetColumnTextFromItemParams = {
  itemId: ItemId;
  columnId: ColumnId;
  token: Token;
};

export type UpdateTextColumnValueParams = {
  itemId: ItemId;
  boardId: BoardId;
  columnId: ColumnId;
  value: string;
  token: Token;
};
