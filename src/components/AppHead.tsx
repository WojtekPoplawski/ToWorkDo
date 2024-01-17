import { Grid, IconButton, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { HourglassEmpty, Pause, PlayArrow } from "@mui/icons-material";

type AppHeadProps = {
  tab: number;
  handleTabChange: Function;
  timeLoggerState: boolean;
  handleTimeLoggerStateOn: Function;
  handleTimeLoggerStateOff: Function;
};

const AppHead = ({
  tab,
  handleTabChange,
  timeLoggerState,
  handleTimeLoggerStateOn,
  handleTimeLoggerStateOff,
}: AppHeadProps) => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: "4em",
        paddingRight: "1em",
        paddingLeft: "1em",
      }}
    >
      <Grid container item xs={3} alignItems={"center"}>
        <HourglassEmpty fontSize={"large"} />
        <Typography variant={"h5"}>ToWorkDo</Typography>
      </Grid>
      <Grid item xs={6}>
        <Tabs
          value={tab}
          onChange={(event, newValue) => handleTabChange(event, newValue)}
          variant="fullWidth"
        >
          <Tab label={t("table")} />
          <Tab label={t("backlog")} />
          <Tab label={t("time_log")} />
          <Tab label={t("stats")} />
        </Tabs>
      </Grid>

      <Grid item xs={3}>
        <Paper>
          <IconButton
            onClick={() =>
              timeLoggerState
                ? handleTimeLoggerStateOff()
                : handleTimeLoggerStateOn()
            }
          >
            {timeLoggerState ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AppHead;
