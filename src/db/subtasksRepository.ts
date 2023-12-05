// import { db } from "./db";
// import { Subtask } from "./entities";
// import { useQuery } from "react-query";

// export class SubtaskRepository {

//   static addSubtask = (subtask: Subtask) =>
//     useQuery(["addSubtask"], async () => db.subtasks.add(subtask));

//   static getSubtasksForTask = (task_id: number) =>
//     useQuery([], async () =>
//       db.subtasks.where("task_id").equals(task_id).toArray()
//     );

//   static updateSubtask = (subtask: Subtask) =>
//     useQuery(["updateSubtask"], async () => {
//       const { id, ...updatedSubtask } = subtask;
//       if (id) {
//         await db.subtasks.update(id, updatedSubtask);
//       }
//     });

//   static deleteSubtask = (subtaskId: number) =>
//     useQuery(["deleteSubtask"], async () => {
//       await db.subtasks.delete(subtaskId);
//     });

//     static deleteSubtasksByTaskId = (task_id: number) =>
//     useQuery(["deleteSubtasksByTaskId"], async () => {
//       await db.subtasks.where("task_id").equals(task_id).delete();
//     });
// }