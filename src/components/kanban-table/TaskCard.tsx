import { Paper, Typography } from "@mui/material"
import { Task } from "../../db/entities"

type TaskCardProps = {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Paper sx={{marginY: "0.5rem", padding:"1rem"}}>
      <Typography variant="h6">{task.title}</Typography>   
    </Paper>
  )
}
export default TaskCard