import { TableCell, TableRow } from "@mui/material";
import { TimeLog } from "../../db/entities";
import { useEffect, useState } from "react";
import { TaskRepository } from "../../db/tasksRepository";
import { useTranslation } from "react-i18next";
import { secondsToSpend } from "../shared/Utlis.ts";

type TimelogTableRowProps = {
  timelog: TimeLog;
};

const TimelogTableRow = ({ timelog }: TimelogTableRowProps) => {
  const { t } = useTranslation();
  const [taskName, setTaskName] = useState<string | undefined>("");
  useEffect(() => {
    TaskRepository.getTask(timelog.task_id).then((task) =>
      setTaskName(task?.title),
    );
  });

  return (
    <TableRow>
      <TableCell>{timelog.id}</TableCell>
      <TableCell>{taskName}</TableCell>
      <TableCell>{timelog.status}</TableCell>
      <TableCell>{timelog.start.toLocaleString()}</TableCell>
      <TableCell>{timelog.end?.toLocaleString()}</TableCell>
      <TableCell>{secondsToSpend(timelog.time_spent, t)}</TableCell>
    </TableRow>
  );
};
export default TimelogTableRow;
