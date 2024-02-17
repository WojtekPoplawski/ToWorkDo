export interface Task {
  id?: number;
  title: string;
  project_id?: number;
  description?: string;
  priority: -2 | -1 | 0 | 1 | 2;
  assigned: "none" | "todo" | "working" | "verification" | "done";
  create_date: Date;
  deadline: Date;
  subtasks?: Array<Subtask>;
  subtask_count: number;
  hide: boolean;
}

export type Subtask = { id: number; title: string; done: boolean };

export interface Project {
  id?: number;
  title: string;
  description?: string;
}

export interface TimeLog {
  id?: number;
  task_id: number;
  status: "todo" | "working" | "verification" | "done";
  start: Date;
  end?: Date;
  time_spent: number;
}
