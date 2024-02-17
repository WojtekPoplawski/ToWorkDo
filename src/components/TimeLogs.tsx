import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import { TimelogsRepository } from "../db/timelogsRepository";
import { useTranslation } from "react-i18next";
import TimelogTableRow from "./timelog-components/TimelogTableRow";
import { useEffect, useState } from "react";

const TimeLogs = () => {
  const { t } = useTranslation();
  const timelogs = TimelogsRepository.getAll();
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);
  const [valid, setValid] = useState<boolean>(false);
  const [filteredTimelogs, setFilteredTimelogs] = useState(timelogs);

  useEffect(() => {
    setFilteredTimelogs(timelogs);
  }, [timelogs]);

  const handleFilterOn = () => {
    setFilteredTimelogs(
      timelogs?.filter(
        (timelog) =>
          timelog.start.getTime() > new Date(startTime || "").getTime() &&
          (timelog.end !== undefined
            ? timelog.end.getTime() < new Date(endTime || "").getTime()
            : true)
      )
    );
  };

  const handleFilterOff = () => {
    setStartTime("");
    setEndTime("");
    setValid(false);
    setFilteredTimelogs(timelogs);
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEndTime(event.target.value);
  };

  useEffect(() => {
    if (startTime && endTime) {
      setValid(true);
    }
  }, [startTime, endTime]);

  return (
    <Grid container justifyContent={"center"}>
      <Grid item container alignItems={"center"} direction={"row"}>
        <Grid
          container
          item
          xs={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button onClick={() => handleFilterOff()}>
            {t("show_all_timelogs")}
          </Button>
        </Grid>
        <Grid
          container
          item
          xs={4}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Typography>{t("start_time_filter")}</Typography>
          <TextField
            onChange={handleStartTimeChange}
            type="datetime-local"
            value={startTime}
          />
        </Grid>
        <Grid
          container
          item
          xs={4}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Typography>{t("end_time_filter")}</Typography>
          <TextField
            onChange={handleEndTimeChange}
            type="datetime-local"
            value={endTime}
          />
        </Grid>
        <Grid
          container
          item
          xs={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button disabled={!valid} onClick={handleFilterOn}>
            {t("filter_logs")}
          </Button>
        </Grid>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>#</TableCell>
            <TableCell>{t("timelog_table_task")}</TableCell>
            <TableCell>{t("timelog_table_task_status")}</TableCell>
            <TableCell>{t("timelog_table_time_start")}</TableCell>
            <TableCell>{t("timelog_table_time_end")}</TableCell>
            <TableCell>{t("timelog_table_time_spend")}</TableCell>
          </TableHead>
          <TableBody>
            {filteredTimelogs?.map((timelog, index) => (
              <TimelogTableRow key={index} timelog={timelog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
export default TimeLogs;
