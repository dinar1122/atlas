import { createAppSlice } from "../../app/createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"
import demoTasks from "../../app/assets/data.json"
import demoDictionary from "../../app/assets/dictionay.json"
import { Task, TasksState } from "../../app/assets/types"

const initialState: TasksState = {
  tasks: demoTasks.map((task, index) => ({
    ...task,
    id: index,
  })),
  dictionary: {
    assignees: demoDictionary.assignees,
    statuses: demoDictionary.statuses,
  },
}

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newId = Date.now()
      const newTask = {
        ...action.payload,
        id: newId,
        assigneeId: newId,
      }

      state.dictionary.assignees[newId] = action.payload.assignee

      state.tasks.push(newTask)
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    createEmptyTask: (state, action: PayloadAction<number>) => {
      const statusId = action.payload
      const newId = Date.now()
      const newTask = {
        taskName: "",
        statusId,
        id: newId,
        assigneeId: "",
      }
      state.tasks.push(newTask)
    },
    editAuthorName: (
      state,
      action: PayloadAction<{ taskId: number; authorName: string }>,
    ) => {
      const { taskId, authorName } = action.payload

      const taskIndex = state.tasks.findIndex(task => task.id === taskId)

      let authorId = null

      if (taskIndex === -1) {
        console.warn(`задача не найдена`)
        return
      }

      const foundEntry = Object.entries(state.dictionary.assignees).find(
        ([key, author]) => author === authorName,
      )

      if (!foundEntry) {
        const newId = Date.now()
        authorId = newId
        const newAssignee = { [newId]: authorName }

        state.dictionary.assignees = {
          ...state.dictionary.assignees,
          ...newAssignee,
        }
      } else {
        authorId = foundEntry[0]
      }

      state.tasks = state.tasks.map((task, index) =>
        index === taskIndex ? { ...task, assigneeId: Number(authorId) } : task,
      )
    },
    editTaskName: (
      state,
      action: PayloadAction<{ taskId: number; taskName: string }>,
    ) => {
      const { taskId, taskName } = action.payload
      console.log(taskName)
      state.tasks.map((task)=> {
        if(task.id === taskId) {
          task.taskName = taskName
        }
      })

    },
    moveTask: (
      state,
      action: PayloadAction<{
        taskId: number
        sourceStatusId: number
        targetStatusId: number
      }>,
    ) => {
      const { taskId, targetStatusId } = action.payload
      const taskIndex = state.tasks.findIndex(t => t.id === taskId)

      if (taskIndex >= 0) {
        state.tasks[taskIndex].statusId = targetStatusId
      }
    },
  },
  selectors: {
    selectAssignees: state => {
      return state.dictionary.assignees
    },
    selectStatuses: state => {
      return state.dictionary.statuses
    },
  },
})

export const {
  addTask,
  deleteTask,
  moveTask,
  createEmptyTask,
  editAuthorName,
  editTaskName
} = tasksSlice.actions

export const { selectAssignees, selectStatuses } = tasksSlice.selectors

export default tasksSlice.reducer
