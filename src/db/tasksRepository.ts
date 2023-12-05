import { useQuery } from 'react-query';
import { db } from './db';
import { Task } from './entities';

export const addTask= (task: Task) =>
useQuery(['addTask'], async () => db.tasks.add(task))

export const getAllTasks =  () =>
useQuery(['getAllTasks'], async () => db.tasks.toArray())

export const TaskRepository = {
  addTask: (task: Task) =>
    useQuery(['addTask'], async () => db.tasks.add(task)),

  getTasksForProject: (project_id: number) =>
    useQuery([], async () => db.tasks.where('project_id').equals(project_id).toArray()),

  updateTask: (task: Task) =>
    useQuery(['updateTask'], async () => {
      const { id, ...updatedTask } = task;
      if (id) {
        await db.tasks.update(id, updatedTask);
      }
    }),

  getAllTasks: () =>
    useQuery(['getAllTasks'], async () => db.tasks.toArray()),

  deleteTask: (taskId: number) =>
    useQuery(['deleteTask'], async () => {
      await db.tasks.delete(taskId);
    }),

  deleteTasksByProjectId: (project_id: number) =>
    useQuery(['deleteTasksByProjectId'], async () => {
      await db.tasks.where('project_id').equals(project_id).delete();
    }),
};
