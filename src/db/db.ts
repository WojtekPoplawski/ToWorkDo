import Dexie, { Table } from "dexie";
import { Project, Task } from "./entities";

export class ToWorkDoDB extends Dexie {
  tasks!: Table<Task>;
  projects!: Table<Project>;

  constructor() {
    super("app_db");
    this.version(1).stores({
      tasks: "++id,title,project_id,assigned,deadline",
      projects: "++id,title",
    });
  }
}

export const db = new ToWorkDoDB();
