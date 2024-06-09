import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { devtools } from 'zustand/middleware';
import type { Task } from '~/model/types';

export type TasksState = {
  tasks: Task[] | null;
  setTasks: (tasks: Task[] | null) => void;
};

const useRegionStore = createWithEqualityFn<TasksState>()(
  devtools(set => ({
    tasks: null,
    setTasks: tasks => set({ tasks }),
  })),
  shallow,
);

export default useRegionStore;
