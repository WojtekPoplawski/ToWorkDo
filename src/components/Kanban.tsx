import { Grid } from "@mui/material";
import KanbanRow from "./kanban-table/KanbanRow";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { TaskRepository } from "../db/tasksRepository";

const Kanban = () => {
  const {t} = useTranslation();

  const tasks = TaskRepository.getAllTasks();
  const tasksByAssigment = (assigned: 0 | 1 | 2 | 3 | 4) => tasks?.filter(task => task.assigned === assigned);

  return (
    
    <Grid container item justifyContent="center" xs={12} spacing={3}>
      <KanbanRow title={t("kanban_to_do")} tasks={tasksByAssigment(1)}/>
      <KanbanRow title={t("kanban_in_progress")}tasks={tasksByAssigment(2)}/>
      <KanbanRow title={t("kanban_verify")}tasks={tasksByAssigment(3)}/>
      <KanbanRow title={t("kanban_done")}tasks={tasksByAssigment(4)}/>
    </Grid>
    
  );
}
export default Kanban;