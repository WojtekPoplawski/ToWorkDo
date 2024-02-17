import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Task } from "../../db/entities.ts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PrioritySelect from "./PrioritySelect.tsx";
import { TaskRepository } from "../../db/tasksRepository.ts";

type EditTaskDialog = {
  task: Task;
  timeLoggerState?: boolean;
  buttonOptions?: {
    variant?: "text" | "outlined" | "contained" | undefined;
    color?:
      | "inherit"
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "info"
      | "warning"
      | undefined;
  };
};

const EditTaskDialog = ({ task, timeLoggerState ,buttonOptions }: EditTaskDialog) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newPriority, setNewPriority] = useState<
  -2 | -1 | 0 | 1 | 2 | undefined | null>(task.priority);
  const [newDeadline, setNewDeadline] = useState(
    task.deadline.toISOString().slice(0, 16),
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewDescription(event.target.value);
  };
  const handlePriorityChange = (number: -2 | -1 | 0 | 1 | 2 | null) => {
    setNewPriority(number);
  };
  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDeadline(event.target.value);
  };
  const handleClearForm = () => {
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewPriority(task.priority);
    setNewDeadline(task.deadline.toISOString().slice(0, 16));
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleClearForm();
  };

  const handleEdit = () => {
    TaskRepository.editTask({
      id: task.id!!,
      title: newTitle,
      description: newDescription,
      priority: newPriority || task.priority,
      deadline: new Date(newDeadline),
      assigned: task.assigned,
      create_date: task.create_date,
      hide: task.hide,
      subtask_count: task.subtask_count,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        handleClose();
      });
  };

  return (
    <>
      <Button
        color={
          buttonOptions?.color !== undefined ? buttonOptions?.color : "primary"
        }
        variant={
          buttonOptions?.variant !== undefined ? buttonOptions?.variant : "text"
        }
        onClick={handleOpen}
        disabled={task.hide || timeLoggerState}
      >
        {
          t("edit_task_button")
        }
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {t("edit_task_dialog_title")}
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            item
            xs={12}
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid
              container
              item
              xs={12}
              direction={"column"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Typography>
                {t("task_title")}
              </Typography>
              <TextField value={newTitle} onChange={handleTitleChange} />
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction={"column"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Typography>
                {t("task_description")}
              </Typography>
              <TextField
                multiline
                minRows={3}
                value={newDescription}
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction={"column"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Typography>{t("task_priority")}</Typography>
              <PrioritySelect
                value={newPriority}
                handleValueChange={handlePriorityChange}
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction={"column"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Typography>{t("task_deadline")}</Typography>
              <TextField
                type="datetime-local"
                value={newDeadline}
                onChange={handleDeadlineChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t("edit_task_dialog_cancel_button")}
          </Button>
          <Button onClick={handleEdit}>
            {t("edit_task_dialog_save_button")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default EditTaskDialog;
