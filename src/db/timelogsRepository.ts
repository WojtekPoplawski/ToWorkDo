import { db } from "./db.ts";
import { useLiveQuery } from "dexie-react-hooks";
import { TimeLog } from "./entities.ts";
import { IndexableType } from "dexie";

export class TimelogsRepository {
  static getAll = () => useLiveQuery(() => db.timelogs.toArray(), []) || [];

  static add = async (timelog: TimeLog): Promise<IndexableType> =>
    await db.timelogs.add(timelog);

  static edit = async (timelog: TimeLog): Promise<IndexableType> =>
    await db.timelogs.update(timelog.id as number, timelog);

  static get = async (id: number): Promise<TimeLog | undefined> =>
    await db.timelogs.get(id);

  static getAllNotDone = async (): Promise<TimeLog[]> =>
    await db.timelogs.where("time_spent").equals(0).toArray();

  static getAllNotDoneForTask = async (task_id: number): Promise<TimeLog[]> =>
    await db.timelogs.where({ task_id, time_spent: 0 }).toArray();

  static getFastestTimelog = async (): Promise<TimeLog | undefined> =>
    await db.timelogs.orderBy("time_spent").first();

  static getSlowestTimelog = async (): Promise<TimeLog | undefined> =>
    await db.timelogs.orderBy("time_spent").last();
}
