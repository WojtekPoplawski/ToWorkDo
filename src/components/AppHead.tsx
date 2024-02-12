import {
  Autocomplete,
  Chip,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { HourglassEmpty, Pause, PlayArrow } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { secondsToSpend } from "./shared/Utlis";

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
  const { t,i18n } = useTranslation();
  const [timeLoggerStartTime, setTimeLoggerStartTime] = useState(
    new Date(localStorage.getItem("timeLoggerStartTime") || "").getTime() ||
      null
  );
  const [timeLoggerActiveTime, setTimeLoggerActiveTime] = useState(timeLoggerStartTime !== null ? new Date().getTime() - timeLoggerStartTime : 0);

  const languages = [
    { value: "en", label: "English" },
    { value: "pl", label: "Polski" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages.find((lang) => lang.value === i18n.language) || {
    value: "en",
    label: "English",
  });

  const handleLanguageChange = (language: { value: string; label: string; }) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.value);
  }

  useEffect(() => {
    const interval = setInterval(() => {
        setTimeLoggerActiveTime(timeLoggerStartTime !== null ? new Date().getTime() - timeLoggerStartTime : 0);
    }, 60000);
    return () => clearInterval(interval);
  }, [timeLoggerActiveTime]);

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
          <Grid container item justifyContent={"space-between"} alignItems={"center"}>
            <><IconButton
              onClick={() =>
                timeLoggerState
                  ? handleTimeLoggerStateOff()
                  : handleTimeLoggerStateOn()
              }
            >
              {timeLoggerState ? <Pause /> : <PlayArrow />}
            </IconButton>
            {timeLoggerState && (
              <Chip label={secondsToSpend(timeLoggerActiveTime / 1000, t)} />
            )}</>
            
            <Autocomplete
              value={selectedLanguage}
              onChange={(event, value) => handleLanguageChange(value || { value: "en", label: "English"})}
              options={languages}
              defaultValue={{ value: "en", label: "English" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  sx={{ marginX: "0.5rem", marginY: "0.25rem", width: "10rem"}}
                  label={t("language")}
                />
              )}
            />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AppHead;
