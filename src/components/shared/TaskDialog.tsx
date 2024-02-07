import { useTranslation } from "react-i18next";
import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Subtask, Task } from "../../db/entities.ts";
import PriorityIcon from "./PriorityIcon.tsx";
import { TaskRepository } from "../../db/tasksRepository.ts";
import BooleanIcon from "./BooleanIcon.tsx";
import { Remove } from "@mui/icons-material";

type TaskDialogProps = {
  task: Task;
};

const TaskDialog = ({ task }: TaskDialogProps) => {
  //Misc
  const { t } = useTranslation();

  //States
  const [open, setOpen] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState<string>("");

  //Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubtaskTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSubtaskTitle(event.target.value);
  };
  const handleAddSubtask = () => {
    const existingSubtasks = task.subtasks || [];
    TaskRepository.editTask({
      ...task,
      subtasks: [
        ...existingSubtasks,
        { id: task.subtask_count, title: subtaskTitle, done: false },
      ],
      subtask_count: task.subtask_count + 1,
    });
  };
  const handleRemoveSubtask = (subtask: Subtask) => {
    TaskRepository.editTask({
      ...task,
      subtasks: task.subtasks?.filter((element) => element.id !== subtask.id),
    });
  };

  return (
    <>
      <Button onClick={handleOpen}>
        {t("open_task_dialog") /*TODO: Add Translation*/}
      </Button>
      <Dialog open={open} maxWidth={"md"} fullWidth={true}>
        <DialogTitle>
          <Grid container item justifyContent={"space-between"}>
            <Grid item>
              <Typography variant={"h3"}>{task.title}</Typography>
            </Grid>
            <Grid item>
              <Chip
                label={t("task_priority")}
                icon={<PriorityIcon priority={task.priority} />}
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <Chip label={t("task_description")} />
              <Typography variant={"body1"}>{task.description}</Typography>
            </Grid>
            <Grid item xs={6}>
              <p>{task.project_id}</p>
              <Chip label={t("task_create_date")} />
              <p>{task.create_date.toLocaleString()}</p>
              <Chip label={t("task_deadline")} />
              <p>{task.deadline.toLocaleString()}</p>
            </Grid>
          </Grid>
          <Grid>
            <Chip label={t("task_subtasks")} />
            {task.subtasks?.map((subtask,index) => (
              <div key={index}>
                <Grid
                  container
                  item
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{ padding: "0.5rem" }}
                >
                  <Grid item xs={9}>
                    <Typography>{subtask.title}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {/*TODO: Add Translation*/}
                    <Chip
                      size={"medium"}
                      label={subtask.done ? t("done") : t("not_done")}
                      icon={<BooleanIcon value={subtask.done} />}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => handleRemoveSubtask(subtask)}>
                      <Remove />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
              </div>
            ))}
            <Grid
              container
              item
              alignItems={"center"}
              spacing={1}
              sx={{ marginY: "0.5rem" }}
            >
              <Grid item xs={10}>
                <TextField
                  value={subtaskTitle}
                  onChange={handleSubtaskTitleChange}
                  label={t("subtask_title")}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={handleAddSubtask}>{t("add_subtask")}</Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t("close_task_dialog") /*TODO: Add Translation*/}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default TaskDialog;
