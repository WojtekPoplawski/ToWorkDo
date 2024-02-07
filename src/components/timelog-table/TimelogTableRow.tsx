import { Tab, TableCell, TableRow } from "@mui/material";
import { TimeLog } from "../../db/entities";
import { useEffect, useState, useTransition } from "react";
import { TaskRepository } from "../../db/tasksRepository";
import { useTranslation } from "react-i18next";

type TimelogTableRowProps = {
  timelog: TimeLog;
};

const TimelogTableRow = ({ timelog }: TimelogTableRowProps) => {
  const { t } = useTranslation();
  const [taskName, setTaskName] = useState<string | undefined>("");
  useEffect(() => {
    TaskRepository.getTask(timelog.task_id).then((task) =>
      setTaskName(task?.title)
    );
  });

  const secondsToSpend = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return hours === 0
      ? `${minutes % 60} ${t("minutes")}`
      : `${hours} ${t("hours")} ${t("and")} ${minutes % 60} ${t("minutes")}`;
  };

  return (
    <TableRow>
      <TableCell>{timelog.id}</TableCell>
      <TableCell>{taskName}</TableCell>
      <TableCell>{timelog.status}</TableCell>
      <TableCell>{timelog.start.toLocaleString()}</TableCell>
      <TableCell>{timelog.end?.toLocaleString()}</TableCell>
      <TableCell>{secondsToSpend(timelog.time_spent)}</TableCell>
    </TableRow>
  );
};
export default TimelogTableRow;
