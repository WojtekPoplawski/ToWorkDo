import { Grid, Paper, Typography } from "@mui/material";
import { Task } from "../../db/entities";
import TaskCard from "./TaskCard";

type KanbanRowProps = {
  title: string;
  tasks: Task[];
};

const KanbanRow = ({ title,tasks }: KanbanRowProps) => {
  return (
    <Grid item xs={3} >
      <Paper sx={{ padding: "1rem" }}>
        <Typography variant="h5">{title}</Typography>
        <Grid>
        {tasks.map((task,index) => (<TaskCard key={index} task={task} />))}</Grid>
      </Paper>
    </Grid>
  );
};
export default KanbanRow;
