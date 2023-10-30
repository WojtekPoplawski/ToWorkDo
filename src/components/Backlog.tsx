import {
  Grid,
  IconButton,
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
import { useState } from "react";
import { ArrowDownward } from "@mui/icons-material";

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
  const mockData: Array<Task> = [
    {
      id: 0,
      title: "Opracowanie schematu bazy danych",
      description: "Description of task one",
      priority: 0,
      assigned: false,
      create_date: new Date(),
      deadline: new Date(),
    },
    {
      id: 0,
      title: "Podłącznie indexedDB do aplikacji",
      description: "Description of task one",
      priority: 0,
      assigned: false,
      create_date: new Date(),
      deadline: new Date(),
    },
    {
      id: 0,
      title: "Utworzenie szkieletu backlogu",
      description: "Description of task one",
      priority: 0,
      assigned: false,
      create_date: new Date(),
      deadline: new Date(),
    },
    {
      id: 0,
      title: "Task one",
      description: "Description of task one",
      priority: 0,
      assigned: false,
      create_date: new Date(),
      deadline: new Date(),
    },
  ];
  const { t } = useTranslation();
  const [taskList, setTaskList] = useState<Array<Task>>(mockData);

  return (
    <Grid container justifyContent={"center"}>
      <Typography variant={"h3"}>BackLog</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>{t("task_title")}</TableCell>
              <TableCell>{t("task_priority")}</TableCell>
              <TableCell>{t("task_deadline")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  <Typography>{task.deadline.toString()}</Typography>
                </TableCell>
                <TableCell>
                  {task.subtasks !== undefined && task.subtasks?.length > 0 && (
                    <IconButton>
                      <ArrowDownward />
                    </IconButton>
                  )}
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
