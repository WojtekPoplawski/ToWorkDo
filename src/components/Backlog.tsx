import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddNewTask from "./shared/AddNewTask";
import BacklogTableRow from "./backlog-table/BacklogTableRow";
import { TaskRepository } from "../db/tasksRepository";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: number;
  assigned: boolean;
  create_date: Date;
  deadline: Date;
  subtasks?: Array<Subtask>;
};

type Subtask = {
  id: number;
  task_id: number;
  title: string;
  description: string;
  priority: number;
  assigned: boolean;
  create_date: Date;
  deadline: Date;
};

const Backlog = () => {
  const { t } = useTranslation();

  const tasks = TaskRepository.getAllTasks();

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
    <Grid container justifyContent="center">
      <Typography variant="h3">BackLog</Typography>
      <AddNewTask />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>{t("table_task_title")}</TableCell>
              <TableCell>{t("table_task_project")}</TableCell>
              <TableCell>{t("table_task_priority")}</TableCell>
              <TableCell>{t("table_task_assigned")}</TableCell>
              <TableCell>{t("table_task_deadline")}</TableCell>
              <TableCell>{t("table_task_options")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((task, index) => (
              <BacklogTableRow key={index} task={task} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Backlog;
