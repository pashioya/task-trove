import { api } from "@tryve-apps/monday-server-sdk";
import { fetchItemsQuery, updateSimpleColumnValue } from "@/app/queries";
import {
  GetColumnTextFromItemParams,
  UpdateTextColumnValueParams,
} from "@/app/types/services";

export const getColumnTextFromItem = async ({
  itemId,
  columnId,
  token,
}: GetColumnTextFromItemParams) => {
  const { items } = await api.query({
    token,
    query: fetchItemsQuery,
    variables: {
      itemId: itemId.toString(),
      columnId: columnId,
    },
  });

  if (items && items.length > 0) {
    const item = items[0];

    if (item?.column_values && item.column_values.length > 0) {
      const columnValue = item.column_values.find(
        (columnValue) => columnValue.id === columnId
      );

      if (columnValue && columnValue.text) {
        return columnValue.text;
      }
    }
  }
};

export const updateTextColumnValue = async ({
  itemId,
  boardId,
  columnId,
  value,
  token,
}: UpdateTextColumnValueParams) => {
  await api.query({
    token,
    query: updateSimpleColumnValue,
    variables: {
      itemId: itemId.toString(),
      boardId: boardId.toString(),
      columnId,
      value: value.toUpperCase(),
    },
  });
};
