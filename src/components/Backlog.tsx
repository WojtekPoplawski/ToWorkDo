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
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import AddNewTask from "./shared/AddNewTask";
import BooleanIcon from "./shared/BooleanIcon";

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

  const tasks = useLiveQuery(() => db.tasks.toArray(), []);

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
              <TableCell>{t("task_title")}</TableCell>
              <TableCell>{t("project_id")}</TableCell>
              <TableCell>{t("task_priority")}</TableCell>
              <TableCell>{t("task_assigned")}</TableCell>
              <TableCell>{t("task_deadline")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.project_id}</TableCell>
                <TableCell>{getPrioirtyLabel(task.priority)}</TableCell>
                <TableCell>
                  <BooleanIcon value={task.assigned} />
                </TableCell>
                <TableCell>
                  <Typography>{task.deadline.toUTCString()}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Backlog;
