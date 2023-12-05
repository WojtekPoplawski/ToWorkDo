// import { useQuery } from "react-query";
// import { db } from "./db";
// import { Project } from "./entities";

// export class ProjectRepository {
//     static addProject = (project: Project) =>
//       useQuery(["addProject"], async () => db.projects.add(project));
  
//     static getAllProjects = () =>
//       useQuery(["getAllProjects"], async () => db.projects.toArray());
  
//     static getProjectById = (projectId: number) =>
//       useQuery(["getProjectById", projectId], async () =>
//         db.projects.where("id").equals(projectId).first()
//       );
  
//     static updateProject = (project: Project) =>
//       useQuery(["updateProject"], async () => {
//         const { id, ...updatedProject } = project;
//         if (id) {
//           await db.projects.update(id, updatedProject);
//         }
//       });
  
//     static deleteProject = (projectId: number) =>
//       useQuery(["deleteProject"], async () => {
//         await db.projects.delete(projectId);
//       });
//   }
  