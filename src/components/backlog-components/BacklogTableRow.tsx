import {
  Button,
  ButtonGroup,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Task } from "../../db/entities";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TaskRepository } from "../../db/tasksRepository";
import EditTaskDialog from "../shared/EditTaskDialog.tsx";
import TaskDialog from "../shared/TaskDialog.tsx";

type BackLogTableRowProps = {
  task: Task;
};

const BacklogTableRow = ({ task }: BackLogTableRowProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [timeLoggerState, setTimeLoggerState] = useState(
    localStorage.getItem("timeLoggerState") === "true"
  );

  useEffect(() => {
    setTimeLoggerState(localStorage.getItem("timeLoggerState") === "true");
  }, [localStorage.getItem("timeLoggerState")]);

  const handleDelete = () => {
    TaskRepository.deleteTask(task.id!!);
  };

  const handleMoveToKanban = () => {
    TaskRepository.editTask({ ...task, assigned: "todo" });
  };

  const getPrioirtyLabel = (priority: number | undefined | null) => {
    switch (priority) {
      case 2:
        return t("highest_priority");
      case 1:
        return t("high_priority");
      case 0:
        return t("neutral_priority");
      case -1:
        return t("low_priority");
      case -2:
        return t("lowest_priority");
      default:
        return t("neutral_priority");
    }
  };

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>{task.id}</TableCell>
      <TableCell component="th" scope="row">
        {task.title}
      </TableCell>
      <TableCell>{task.project_id}</TableCell>
      <TableCell>{getPrioirtyLabel(task.priority)}</TableCell>
      <TableCell>{t(task.assigned)}</TableCell>
      <TableCell>
        <Typography>{task.deadline.toLocaleString()}</Typography>
      </TableCell>
      <TableCell>
        <ButtonGroup>
          <EditTaskDialog
            task={task}
            timeLoggerState={timeLoggerState}
            buttonOptions={{ color: "primary", variant: "contained" }}
          />
          <Button
            variant="contained"
            color="error"
            disabled={timeLoggerState}
            onClick={handleDelete}
          >
            {t("task_table_delete")}
          </Button>
          <TaskDialog task={task} />
          <Button
            variant={"contained"}
            color={"warning"}
            onClick={handleMoveToKanban}
            disabled={task.assigned !== "none"}
          >
            {t("task_table_add_to_kanban")}
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};
export default BacklogTableRow;
