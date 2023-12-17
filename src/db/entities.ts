export interface Task {
  id?: number;
  title: string;
  project_id?: number;
  description?: string;
  priority: number;
  assigned: 0 | 1 | 2 | 3 | 4;
  create_date: Date;
  deadline: Date;
}

export interface Subtask {
  id?: number;
  task_id: number;
  title: string;
  description?: string;
  priority: number;
  assigned: 0 | 1 | 2 | 3 | 4;
  create_date: Date;
  deadline: Date;
}

export interface Project {
  id?: number;
  title: string;
  description?: string;
}
