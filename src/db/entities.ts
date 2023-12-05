export interface Task {
  id?: number;
  title: string;
  project_id: number | undefined;
  description: string | undefined;
  priority: number;
  assigned: boolean;
  create_date: Date;
  deadline: Date;
}

export interface Subtask {
  id?: number;
  task_id: number;
  title: string;
  description: string | undefined;
  priority: number;
  assigned: boolean;
  create_date: Date;
  deadline: Date;
}

export interface Project {
  id?: number;
  title: string
  description: string | undefined;
}


