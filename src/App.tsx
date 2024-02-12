import { useState } from "react";
import "./App.css";
import { Grid, Paper } from "@mui/material";
import AppHead from "./components/AppHead";
import Backlog from "./components/Backlog.tsx";
import Kanban from "./components/Kanban.tsx";
import { startTimeLogging, stopTimeLogging } from "./time-logger/timeLogger.ts";
import TimeLogs from "./components/TimeLogs.tsx";
import Statistics from "./components/Statistics.tsx";

const App = () => {
  const [tab, setTab] = useState(0);
  const [timeLoggerState, setTimeLoggerState] = useState(
    localStorage.getItem("timeLoggerState") === "true" || false,
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const handleTimeLoggerStateOn = () => {
    setTimeLoggerState(true);
    startTimeLogging();
    localStorage.setItem("timeLoggerState", String(true));
    localStorage.setItem("timeLoggerStartTime", String(new Date()));
  };
  const handleTimeLoggerStateOff = () => {
    setTimeLoggerState(false);
    stopTimeLogging();
    localStorage.setItem("timeLoggerState", String(false));
    localStorage.setItem("timeLoggerStartTime", String(""));
  };

  const tabSwitch = () => {
    switch (tab) {
      case 0:
        return (
          <>
            <Kanban />
          </>
        );
      case 1:
        return (
          <>
            <Backlog />
          </>
        );
      case 2:
        return (
          <>
            <TimeLogs />
          </>
        );
      case 3:
        return (
          <>
            <Statistics />
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#e68f4c",
        height: "100vh",
        width: "100vw",
      }}
    >
      <AppHead
        tab={tab}
        handleTabChange={handleTabChange}
        timeLoggerState={timeLoggerState}
        handleTimeLoggerStateOn={handleTimeLoggerStateOn}
        handleTimeLoggerStateOff={handleTimeLoggerStateOff}
      />
      <Paper
        elevation={4}
        sx={{
          borderRadius: 2.5,
          marginLeft: "1rem",
          marginRight: "1rem",
          marginBottom: "1rem",
          height: "88%",
          width: "98%",
          padding: "1rem",
          overflow: "auto",
          scrollbarColor: "#6b6b6b #2b2b2b",
        }}
      >
        {tabSwitch()}
      </Paper>
    </Grid>
  );
};

export default App;
