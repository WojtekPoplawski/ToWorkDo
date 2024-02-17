import {
  Checkbox,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Subtask, Task } from "../../db/entities";
import { Alarm, ArrowLeft, ArrowRight, Close } from "@mui/icons-material";
import { TaskRepository } from "../../db/tasksRepository.ts";
import { getNextAssigned, getPreviousAssigned } from "../shared/Utlis.ts";
import React from "react";
import TaskDialog from "../shared/TaskDialog.tsx";
import {
  timeLoggedTaskHideModification,
  timeloggedTaskStatusModification,
} from "../../time-logger/timeLogger.ts";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const mainPaperStyle =
    (task.subtasks?.length || 0) > 0
      ? {
          marginTop: "0.5rem",
        }
      : { marginY: "0.5rem" };

  const subPaperStyle =
    (task.subtasks?.length || 0) > 0
      ? {
          marginBottom: "0.5rem",
        }
      : { marginY: "0.5rem" };

  const handleTableChangeNext = () => {
    const next = getNextAssigned(task.assigned);
    TaskRepository.editTask({ ...task, assigned: next });
    next !== "none" &&
      timeloggedTaskStatusModification({ ...task, assigned: next });
  };
  const handleTableChangePrevious = () => {
    const next = getPreviousAssigned(task.assigned);
    TaskRepository.editTask({ ...task, assigned: next });
    next !== "none" &&
      timeloggedTaskStatusModification({ ...task, assigned: next });
  };
  const handleHideTaskChange = () => {
    TaskRepository.editTask({ ...task, hide: true });
    timeLoggedTaskHideModification(task);
  };
  const handleSubtaskDoneChange = (value: boolean, subtask: Subtask) => {
    TaskRepository.editTask({
      ...task,
      subtasks: [
        ...(task.subtasks?.filter((element) => element.id !== subtask.id) ||
          []),
        { id: subtask.id, title: subtask.title, done: value },
      ],
    });
  };

  return (
    <>
      <Paper elevation={0} sx={{ ...mainPaperStyle, padding: "1rem" }}>
        <Grid container item justifyContent={"space-between"}>
          <Typography variant="h6">{task.title}</Typography>
          <Grid>
            <IconButton
              disabled={task.assigned == "todo"}
              onClick={handleTableChangePrevious}
            >
              <ArrowLeft />
            </IconButton>
            {task.assigned !== "done" ? (
              <IconButton onClick={handleTableChangeNext}>
                <ArrowRight />
              </IconButton>
            ) : (
              <IconButton onClick={handleHideTaskChange}>
                <Close fontSize="small" />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Grid container item justifyContent={"space-between"}>
          <Grid item>
            <Chip icon={<Alarm />} label={task.deadline.toLocaleString()} />
          </Grid>
          <Grid item>
            <TaskDialog task={task} />
          </Grid>
        </Grid>
      </Paper>
      {(task.subtasks?.length || 0) > 0 && (
        <Paper
          elevation={0}
          sx={{ ...subPaperStyle, marginLeft: "1rem", padding: "1rem" }}
        >
          {task.subtasks?.map((subtask, index) => (
            <Grid
              container
              item
              justifyContent={"space-between"}
              alignItems={"center"}
              key={index}
            >
              <Grid item xs={11}>
                <Typography variant="body2">{subtask.title}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Checkbox
                  checked={subtask.done}
                  onChange={(event) =>
                    handleSubtaskDoneChange(event.target.checked, subtask)
                  }
                />
              </Grid>
            </Grid>
          ))}
        </Paper>
      )}
      <Divider />
    </>
  );
};
export default TaskCard;
