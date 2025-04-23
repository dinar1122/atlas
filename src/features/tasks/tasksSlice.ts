import { createAppSlice } from "../../app/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import demoTasks from '../../app/assets/data.json';
import demoDictionary from '../../app/assets/dictionay.json';
import { Task, TasksState } from "../../app/assets/types";

const initialState: TasksState = {
  tasks: demoTasks.map((task, index) => ({ 
    ...task, 
    id: index 
  })),
  dictionary: {
    assignees: demoDictionary.assignees,
    statuses: demoDictionary.statuses
  }
};

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: ((state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newId = Date.now();
      const newTask = {
        ...action.payload,
        id: newId,
        assigneeId: newId
      };
    
      state.dictionary.assignees[newId] = action.payload.assignee;
      
      state.tasks.push(newTask);
    }),

    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    moveTask: ((
      state, 
      action: PayloadAction<{
        taskId: number;
        sourceStatusId: number;
        targetStatusId: number;
      }>
    ) => {
      const { taskId, targetStatusId } = action.payload;
      const taskIndex = state.tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex >= 0) {
        state.tasks[taskIndex].statusId = targetStatusId;
      }
    }),
  },
  selectors: {
    selectTasksByStatus: (state, statusId: number) => {
      return state.tasks.filter(task => task.statusId === statusId);
    }
  }
});

export const { addTask, deleteTask , moveTask} = tasksSlice.actions;

export const { selectTasksByStatus } = tasksSlice.selectors;

export default tasksSlice.reducer;