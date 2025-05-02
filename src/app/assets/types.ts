export interface Task {
  taskName: string
  assigneeId: number | string
  assignee?: any
  statusId: number
  id?: number,
  authorName?: string
}

export interface Dictionary {
  assignees: Record<string, string>
  statuses: Record<number, string>
}

export interface TasksState {
  tasks: Task[]
  dictionary: Dictionary
}
