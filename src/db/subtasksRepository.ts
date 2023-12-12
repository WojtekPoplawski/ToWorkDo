import { IndexableType } from "dexie";
import { db } from "./db";
import { Subtask } from "./entities";

export class SubtaskRepository {
  static addSubtask = async (subtask: Subtask): Promise<IndexableType> =>
    await db.subtasks.add(subtask);

  static editSubtask = async (subtask: Subtask): Promise<IndexableType> =>
    await db.subtasks.update(subtask.id as number, subtask);

  static deleteSubtask = async (id: number): Promise<void> =>
    await db.subtasks.delete(id);

  static getAllSubtaskForTask = async (task_id: number): Promise<Subtask[]> =>
    await db.subtasks.where("task_id").equals(task_id).toArray();

  static getSubtask = async (id: number): Promise<Subtask | undefined> =>
    await db.subtasks.get(id);

  static deleteSubtaskByTaskId = async (task_id: number): Promise<void> => {
    const transaction = await db.transaction("rw", db.subtasks, async () => {
      await db.subtasks.where("task_id").equals(task_id).delete();
    });
  };

  static getAllNotAssigned = async (): Promise<Subtask[]> =>
    await db.subtasks.where("assigned").equals(0).toArray();

  static getAllAssigned = async (): Promise<Subtask[]> =>
    await db.subtasks.where("assigned").equals(1).toArray();
}
