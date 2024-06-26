import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PrioritySelect from "./PrioritySelect";
import { TaskRepository } from "../../db/tasksRepository";

const AddNewTask = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [priority, setPriority] = useState<
    -2 | -1 | 0 | 1 | 2 | undefined | null
  >(null);
  const [deadline, setDeadline] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (title !== "" && priority !== undefined && priority !== null && new Date(deadline || "").getTime() > new Date().getTime()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [title, description, priority, deadline]);



  const { t } = useTranslation();

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handlePiorityChange = (value: -2 | -1 | 0 | 1 | 2 | null) => {
    setPriority(value);
  };
  const handleDeadlineChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDeadline(event.target.value);
  };
  const handleClearForm = () => {
    setTitle(undefined);
    setDescription(undefined);
    setPriority(null);
    setDeadline(undefined);
  };
  const handleAddNewTask = () => {
    TaskRepository.addTask({
      title: title || "",
      description: description || "",
      priority: priority || 0,
      assigned: "none",
      create_date: new Date(),
      deadline: new Date(deadline || ""),
      subtask_count: 0,
      hide: false
    })
      .then((result: any) => {
        console.log(result);
        handleClose();
        handleClearForm();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained">{t("add_new_task")}</Button>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>{t("add_new_task")}</DialogTitle>
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
              <Typography>{t("add_new_task")}</Typography>
              <TextField value={title} onChange={handleTitleChange} />
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction={"column"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Typography>{t("task_description")}</Typography>
              <TextField
                multiline
                minRows={3}
                value={description}
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
                value={priority}
                handleValueChange={handlePiorityChange}
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
                value={deadline}
                onChange={handleDeadlineChange}
              />
            </Grid>
            <Button
              disabled={!isValid}
              onClick={() => {
                handleAddNewTask();
              }}
            >
              {t("save_task")}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewTask;
