import { Grid } from "@mui/material";
import KanbanRow from "./kanban-table/KanbanRow";
import { useTranslation } from "react-i18next";
import { TaskRepository } from "../db/tasksRepository";

const Kanban = () => {
  const { t } = useTranslation();

  const tasks = TaskRepository.getAllTasks();
  const tasksByAssigment = (
    assigned: "none" | "todo" | "working" | "verification" | "done",
  ) => tasks?.filter((task) => task.assigned === assigned);

  return (
    <Grid container item justifyContent="center" xs={12} spacing={3}>
      <KanbanRow title={t("kanban_to_do")} tasks={tasksByAssigment("todo")} />
      <KanbanRow
        title={t("kanban_in_progress")}
        tasks={tasksByAssigment("working")}
      />
      <KanbanRow
        title={t("kanban_verify")}
        tasks={tasksByAssigment("verification")}
      />
      <KanbanRow title={t("kanban_done")} tasks={tasksByAssigment("done")} />
    </Grid>
  );
};
export default Kanban;
