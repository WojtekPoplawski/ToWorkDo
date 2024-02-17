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
import BacklogTableRow from "./backlog-components/BacklogTableRow";
import { TaskRepository } from "../db/tasksRepository";

const Backlog = () => {
  const { t } = useTranslation();

  const tasks = TaskRepository.getAllTasks();

  return (
    <Grid container justifyContent="center">
      <Grid
        container
        item
        xs={12}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <div></div>
        <Typography variant="h3">{t("backlog")}</Typography>
        <AddNewTask />
      </Grid>
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
