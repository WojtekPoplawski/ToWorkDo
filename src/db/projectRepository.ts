import { IndexableType } from "dexie";
import { db } from "./db";
import { Project } from "./entities";

export class ProjectRepository {
  static addProject = async (project: Project): Promise<IndexableType> =>
    await db.projects.add(project);

  static getAllProjects = async (): Promise<Project[]> =>
    await db.projects.toArray();

  static getProject = async (id: number): Promise<Project | undefined> =>
    await db.projects.get(id);

  static editProject = async (project: Project): Promise<IndexableType> =>
    await db.projects.update(project.id as number, project);

  static deleteProject = async (id: number): Promise<void> =>
    await db.projects.delete(id);

  static countProjects = async (): Promise<number> => await db.projects.count();
}
