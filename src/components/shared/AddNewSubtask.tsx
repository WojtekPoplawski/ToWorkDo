import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PrioritySelect from "./PrioritySelect";
import { SubtaskRepository } from "../../db/subtasksRepository";

type AddNewSubtaskProps = {
  task_id: number;
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

const AddNewSubtask = ({ task_id, buttonOptions }: AddNewSubtaskProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [priority, setPiority] = useState<number | undefined | null>(null);
  const [deadline, setDeadline] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (title && description && priority && deadline) {
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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handlePiorityChange = (value: number | null) => {
    setPiority(value);
  };
  const handleDeadlineChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDeadline(event.target.value);
  };
  const handleClearForm = () => {
    setTitle(undefined);
    setDescription(undefined);
    setPiority(null);
    setDeadline(undefined);
  };
  const handleAddNewSubtask = () => {
    SubtaskRepository.addSubtask({
      task_id: task_id,
      title: title || "",
      description: description || "",
      priority: priority || 0,
      assigned: 0,
      create_date: new Date(),
      deadline: new Date(deadline || ""),
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
      <Button
        color={buttonOptions?.color !== undefined? buttonOptions?.color : "primary"}
        variant={buttonOptions?.variant !== undefined? buttonOptions?.variant: "text"}
        onClick={handleOpen}
      >
        {t("add_new_subtask")}
      </Button>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>{t("add_new_subtask")}</DialogTitle>
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
              <Typography>{t("add_new_subtask")}</Typography>
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
              <Typography>{t("subtask_description")}</Typography>
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
              <Typography>{t("subtask_priority")}</Typography>
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
              <Typography>{t("subtask_deadline")}</Typography>
              <TextField
                type="datetime-local"
                value={deadline}
                onChange={handleDeadlineChange}
              />
            </Grid>
            <Button
              disabled={!isValid}
              onClick={() => {
                handleAddNewSubtask();
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

export default AddNewSubtask;
