import Dexie, {Table} from "dexie";
import { Project, Subtask, Task } from "./entities";

export class ToWorkDoDB extends Dexie {
    tasks!: Table<Task>
    subtasks!: Table<Subtask>
    projects!:Table<Project>

    constructor() {
        super("app_db");
        this.version(1).stores({
            tasks: '++id,title,project_id,assigned,deadline',
            subtasks: '++id,task_id,title,project_id,assigned,deadline',
            projects: '++id,title'
        })
    }
}

export const db = new ToWorkDoDB();