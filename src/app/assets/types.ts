export interface Task {
    taskName: string;
    assigneeId: number | string;
    assignee?: any;
    statusId: number;
    id?: number;
  }
  
  export interface Dictionary {
    assignees: Record<string, string>;  // Ключи могут быть строками (даже если выглядят как числа)
  statuses: Record<number, string>;
  }
  
  export interface TasksState {
    tasks: Task[];
    dictionary: Dictionary;
  }