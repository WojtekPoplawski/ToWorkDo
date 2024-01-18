import { Tab, TableCell, TableRow } from "@mui/material";
import { TimeLog } from "../../db/entities";
import { useEffect, useState } from "react";
import { TaskRepository } from "../../db/tasksRepository";

type TimelogTableRowProps = {
  timelog: TimeLog;
};

const TimelogTableRow = ({ timelog }: TimelogTableRowProps) => {
const [taskName, setTaskName] = useState<string|undefined>("")
useEffect(()=>{
  TaskRepository.getTask(timelog.task_id).then((task)=>setTaskName(task?.title))
})

  return (
    <TableRow>
    <TableCell>{timelog.id}</TableCell>
    <TableCell>{taskName }</TableCell>
    <TableCell>{timelog.status}</TableCell>
    <TableCell>{timelog.start.toUTCString()}</TableCell>
    <TableCell>{timelog.end?.toUTCString()}</TableCell>
    <TableCell>{timelog.time_spent}</TableCell></TableRow>
  );
}
export default TimelogTableRow;