import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Task } from "../../db/entities";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";
import BooleanIcon from "../shared/BooleanIcon";
import { useTranslation } from "react-i18next";
import { db } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { TaskRepository } from "../../db/tasksRepository";
import AddNewSubtask from "../shared/AddNewSubtask";

type BackLogTableRowProps = {
  task: Task;
};

const BacklogTableRow = ({ task }: BackLogTableRowProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const subtasks = useLiveQuery(
    () => db.subtasks.where("task_id").equals(task.id!!).toArray(),
    []
  );

  const handleDelete = () => {
    TaskRepository.deleteTask(task.id!!);
  }

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
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{task.id}</TableCell>
        <TableCell component="th" scope="row">
          {task.title}
        </TableCell>
        <TableCell>{task.project_id}</TableCell>
        <TableCell>{getPrioirtyLabel(task.priority)}</TableCell>
        <TableCell>
          <BooleanIcon value={task.assigned} />
        </TableCell>
        <TableCell>
          <Typography>{task.deadline.toUTCString()}</Typography>
        </TableCell>
        <TableCell>
          <ButtonGroup>
          <AddNewSubtask buttonOptions={{color: "primary", variant:"contained"}} task_id={task.id!!} />
          <Button disabled={true} variant="contained" color="primary">
            {t("task_table_edit")}
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t("task_table_delete")}
          </Button>
          </ButtonGroup>
        </TableCell>
        {subtasks !== undefined && subtasks.length > 0 && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Paper>
                <Grid>
                  <Typography variant="h6" gutterBottom component="div">
                    {t("task_description")}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {task.description}
                  </Typography>
                </Grid>
              </Paper>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>{t("task_title")}</TableCell>
                    <TableCell>{t("task_priority")}</TableCell>
                    <TableCell>{t("task_assigned")}</TableCell>
                    <TableCell>{t("task_deadline")}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subtasks?.map((subtask, index) => (
                    <TableRow key={index}>
                      <TableCell>{subtask.id}</TableCell>
                      <TableCell>{subtask.title}</TableCell>
                      <TableCell>
                        {getPrioirtyLabel(subtask.priority)}
                      </TableCell>
                      <TableCell>
                        <BooleanIcon value={subtask.assigned} />
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {subtask.deadline.toUTCString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
export default BacklogTableRow;
