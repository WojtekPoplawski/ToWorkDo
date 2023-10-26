import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type Task = {
  title: string;
  description: string;
  piority: number;
  assigned: boolean;
  create_date: Date;
  deadline: Date;
};

type Subtask = {
  title: string;
  description: string;
  piority: number;
  assigned: boolean;
  create_date: Date;
  deadline: Date;
};

const Backlog = () => {
  return (
    <Grid container justifyContent={"center"}>
      <Typography variant={"h3"}>BackLog</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
export default Backlog;
