import { IndexableType } from "dexie";
import { db } from "./db";
import { Task } from "./entities";
import { useLiveQuery } from "dexie-react-hooks";

export class TaskRepository {
  static addTask = async (task: Task): Promise<IndexableType> =>
    await db.tasks.add(task);

  static editTask = async (task: Task): Promise<IndexableType> =>
    await db.tasks.update(task.id as number, task);

  static deleteTask = async (id: number): Promise<void> =>
    await db.tasks.delete(id);

  static getAllTasks = () => useLiveQuery(() => db.tasks.toArray(), []) || [];

  static getTask = async (id: number): Promise<Task | undefined> =>
    await db.tasks.get(id);

  static getTasksForProject = async (project_id: number): Promise<Task[]> =>
    await db.tasks.where("project_id").equals(project_id).toArray();

  static deleteTaskByProjectId = async (
    project_id: number
  ): Promise<IndexableType> =>
    await db.tasks.where("project_id").equals(project_id).delete();

  static getAllNotAssigned = async (): Promise<Task[]> =>
    await db.tasks.where("assigned").equals(0).toArray();

  static getAllAssigned = async (): Promise<Task[]> =>
    await db.tasks.where("assigned").equals(1).toArray();
}
