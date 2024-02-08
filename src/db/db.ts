import Dexie, { Table } from "dexie";
import { Project, Task, TimeLog } from "./entities";

export class ToWorkDoDB extends Dexie {
  tasks!: Table<Task>;
  projects!: Table<Project>;
  timelogs!: Table<TimeLog>;

  constructor() {
    super("app_db");
    this.version(1).stores({
      tasks: "++id,title,project_id,assigned,deadline",
      projects: "++id,title",
    });
    this.version(2).stores({
      tasks: "++id,title,project_id,assigned,deadline,hide",
      timelogs: "++id,task_id,start,end,time_spent,status",
    });
    this.version(3).stores({
      tasks: "++id,title,project_id,assigned,deadline,hide,priority",
    });
  }
}

export const db = new ToWorkDoDB();
