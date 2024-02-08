import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import { TimelogsRepository } from "../db/timelogsRepository";
import { useTranslation } from "react-i18next";
import TimelogTableRow from "./timelog-components/TimelogTableRow";

const TimeLogs = () => {
  const { t } = useTranslation();
  const timelogs = TimelogsRepository.getAll();
  return (
    <Grid container justifyContent={"center"}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>#</TableCell>
            <TableCell>
              {t("timelog_table_task")}
              {/* TODO: Add Translation */}
            </TableCell>
            <TableCell>
              {t("timelog_table_task_status")}
              {/* TODO: Add Translation */}
            </TableCell>
            <TableCell>
              {t("timelog_table_time_start")}
              {/* TODO: Add Translation */}
            </TableCell>
            <TableCell>
              {t("timelog_table_time_end")}
              {/* TODO: Add Translation */}
            </TableCell>
            <TableCell>
              {t("timelog_table_time_spend")}
              {/* TODO: Add Translation */}
            </TableCell>
          </TableHead>
          <TableBody>
            {timelogs?.map((timelog, index) => (
              <TimelogTableRow key={index} timelog={timelog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
export default TimeLogs;
