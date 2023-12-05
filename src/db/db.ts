import Dexie, {Table} from "dexie";
import { Project, Subtask, Task } from "./entities";

export class ToWorkDoDB extends Dexie {
    tasks!: Table<Task>
    subtasks!: Table<Subtask>
    projects!:Table<Project>

    constructor() {
        super("toWorkDoDB");
        this.version(1).stores({
            tasks: '++id,title',
            subtasks: '++id,task_id,title',
            projects: '++id,title'
        })
    }
}

export const db = new ToWorkDoDB();