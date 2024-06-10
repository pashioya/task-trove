import { useEffect, useState } from 'react';
import type { Board, Column, Item } from '~/model/types';
import { useSettingsStore } from '~/store';
import { useMondayQuery } from '~/lib/monday/api';
import {
  fetchBoardsQuery,
  fetchColumnsQuery,
  fetchItemsQuery,
  fetchTaskDescriptionQuery,
} from '~/lib/monday/queries';

import { showMondayAlert } from '~/utils/mondayErrorHandling';

const useLocationItemSelects = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [taskColumns, setTaskColumns] = useState<Column[]>([]);

  const [descriptionColumns, setDescriptionColumns] = useState<Column[]>([]);

  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [selectedTaskBoard, setSelectedTaskBoard] = useState<Board | null>(null);
  const [selectedTaskColumn, setSelectedTaskColumn] = useState<Column | null>(null);

  const [selectedDescriptionColumn, setSelectedDescriptionColumn] = useState<Column | null>(null);

  const [boardSelectItems, setBoardSelectItems] = useState<{ label: string; value: string }[]>([]);
  const [columnSelectItems, setColumnSelectItems] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [taskColumnSelectItems, setTaskColumnSelectItems] = useState<
    { label: string; value: string }[]
  >([]);

  const [descriptionColumnSelectItems, setDescriptionColumnSelectItems] = useState<
    { label: string; value: string }[]
  >([]);

  const [itemSelectItems, setItemSelectItems] = useState<{ label: string; value: string }[]>([]);

  const { taskBoard, taskColumn, board, column, item } = useSettingsStore();

  const {
    data: boardsData,
    isLoading: boardsIsLoading,
    isError: boardsIsError,
    error: boardsError,
  } = useMondayQuery({
    query: fetchBoardsQuery,
    variables: {},
  });

  const {
    data: columnsData,
    isLoading: columnsIsLoading,
    isError: columnsIsError,
    error: columnsError,
    refetch: refetchColumns,
  } = useMondayQuery({
    queryKey: [selectedBoard?.id || '', 'columns'],
    query: fetchColumnsQuery,
    variables: { boardId: selectedBoard?.id || '' },
    enabled: !!selectedBoard?.id,
  });

  const {
    data: taskColumnsData,
    isLoading: taskColumnsIsLoading,
    isError: taskColumnsIsError,
    error: taskColumnsError,
    refetch: refetchTaskColumns,
  } = useMondayQuery({
    queryKey: [selectedTaskBoard?.id || '', 'columns'],
    query: fetchColumnsQuery,
    variables: { boardId: selectedTaskBoard?.id || '' },
    enabled: !!selectedTaskBoard?.id,
  });

  const {
    data: itemsData,
    isLoading: itemIsLoading,
    isError: itemsIsError,
    error: itemsError,
    refetch: refetchItems,
  } = useMondayQuery({
    queryKey: [selectedBoard?.id || '', 'items'],
    query: fetchItemsQuery,
    variables: { boardId: selectedBoard?.id || '' },
    enabled: !!selectedBoard?.id,
  });

  const {
    data: descriptionColumnsData,
    isLoading: descriptionColumnsIsLoading,
    isError: descriptionColumnsIsError,
    error: descriptionColumnsError,
  } = useMondayQuery({
    queryKey: [taskBoard?.id || '', 'columns'],
    query: fetchTaskDescriptionQuery,
    variables: { boardId: taskBoard?.id || '' },
    enabled: !!taskBoard?.id,
  });

  useEffect(() => {
    if (boardsIsLoading || !boardsData) {
      return;
    }
    if (boardsIsError) {
      showMondayAlert(boardsError);
      return;
    }
    if (!boardsData.boards) return;

    const boards: Board[] = boardsData.boards.filter((board): board is Board => board !== null);

    setBoards(boards);

    if (boards.length === 1) {
      setSelectedBoard(boards[0]);
    }
    setBoardSelectItems(
      boards.map(board => ({
        label: board.name,
        value: board.id,
      })),
    );
  }, [boardsData, boardsError, boardsIsError, boardsIsLoading]);

  useEffect(() => {
    if (columnsIsLoading) {
      return;
    }
    if (columnsIsError) {
      showMondayAlert(columnsError);
      return;
    }

    if (
      !columnsData ||
      !columnsData.boards ||
      !columnsData.boards[0] ||
      !columnsData.boards[0].columns
    )
      return;

    const columns: Column[] = columnsData.boards[0].columns.filter(
      (column): column is Column => column !== null,
    );
    setColumns(columns);

    setColumnSelectItems(
      columns.map(column => ({
        label: column.title,
        value: column.id,
      })),
    );

    if (columns.length === 0) {
      setSelectedColumn(null);
    } else if (columns.length === 1) {
      setSelectedColumn(columns[0]);
    }
  }, [columnsData, columnsError, columnsIsError, columnsIsLoading]);

  useEffect(() => {
    if (taskColumnsIsLoading) {
      return;
    }
    if (taskColumnsIsError) {
      showMondayAlert(taskColumnsError);
      return;
    }

    if (
      !taskColumnsData ||
      !taskColumnsData.boards ||
      !taskColumnsData.boards[0] ||
      !taskColumnsData.boards[0].columns
    )
      return;

    const columns: Column[] = taskColumnsData.boards[0].columns.filter(
      (column): column is Column => column !== null,
    );

    setTaskColumns(columns);
    setTaskColumnSelectItems(
      columns.map(column => ({
        label: column.title,
        value: column.id,
      })),
    );

    if (columns.length === 0) {
      setSelectedTaskColumn(null);
    } else if (columns.length === 1) {
      setSelectedTaskColumn(columns[0]);
    }
  }, [taskColumnsData, taskColumnsError, taskColumnsIsError, taskColumnsIsLoading]);

  useEffect(() => {
    if (itemIsLoading) {
      return;
    }
    if (itemsIsError) {
      showMondayAlert(itemsError);
      return;
    }

    if (!itemsData || !itemsData.boards || !itemsData.boards[0]) return;
    const items = itemsData.boards[0]?.items_page.items;
    setItems(items);

    setItemSelectItems(
      items.map(item => ({
        label: item.name,
        value: item.id,
      })),
    );
    if (items.length === 0) {
      setSelectedItem(null);
    } else if (items.length === 1) {
      setSelectedItem(items[0]);
    }
  }, [columns.length, itemIsLoading, itemsData, itemsError, itemsIsError]);

  useEffect(() => {
    if (descriptionColumnsIsLoading) {
      return;
    }
    if (descriptionColumnsIsError) {
      showMondayAlert(descriptionColumnsError);
      return;
    }

    if (
      !descriptionColumnsData ||
      !descriptionColumnsData.boards ||
      !descriptionColumnsData.boards[0] ||
      !descriptionColumnsData.boards[0].columns
    )
      return;

    console.log(descriptionColumnsData.boards[0].columns);

    const columns: Column[] = descriptionColumnsData.boards[0].columns.filter(
      (column): column is Column => column !== null,
    );

    setDescriptionColumns(columns);
    setDescriptionColumnSelectItems(
      columns.map(column => ({
        label: column.title,
        value: column.id,
      })),
    );

    if (columns.length === 0) {
      setSelectedDescriptionColumn(null);
    } else if (columns.length === 1) {
      setSelectedDescriptionColumn(columns[0]);
    }
  }, [
    descriptionColumnsData,
    descriptionColumnsError,
    descriptionColumnsIsError,
    descriptionColumnsIsLoading,
  ]);

  useEffect(() => {
    if (taskBoard) {
      setSelectedTaskBoard(taskBoard);
    }
    if (taskColumn) {
      setSelectedTaskColumn(taskColumn);
    }
    if (board) {
      setSelectedBoard(board);
    }
    if (column) {
      setSelectedColumn(column);
    }
    if (item) {
      setSelectedItem(item);
    }
  }, [board, column, item, taskBoard, taskColumn]);

  return {
    boards,
    columns,
    items,
    taskColumns,
    descriptionColumns,
    selectedBoard,
    setSelectedBoard,
    selectedColumn,
    setSelectedColumn,
    selectedItem,
    setSelectedItem,
    selectedTaskBoard,
    setSelectedTaskBoard,
    selectedTaskColumn,
    setSelectedTaskColumn,
    selectedDescriptionColumn,
    setSelectedDescriptionColumn,
    boardSelectItems,
    columnSelectItems,
    itemSelectItems,
    taskColumnSelectItems,
    descriptionColumnSelectItems,
    boardsIsLoading,
    columnsIsLoading,
    taskColumnsIsLoading,
    descriptionColumnsIsLoading,
    itemIsLoading,
    refetchTaskColumns,
    refetchColumns,
    refetchItems,
  };
};

export default useLocationItemSelects;
