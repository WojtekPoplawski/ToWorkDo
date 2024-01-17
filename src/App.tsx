import { useState } from "react";
import "./App.css";
import { Grid, Paper } from "@mui/material";
import AppHead from "./components/AppHead";
import Backlog from "./components/Backlog.tsx";
import Kanban from "./components/Kanban.tsx";
import { startTimeLogging, stopTimeLogging } from "./timeLogger.ts";

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
  };
  const handleTimeLoggerStateOff = () => {
    setTimeLoggerState(false);
    stopTimeLogging();
    localStorage.setItem("timeLoggerState", String(false));
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
        return <>{/* TODO: Add Time log component */}</>;
      case 3:
        return <>{/* TODO: Add Stats component */}</>;
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
        }}
      >
        {tabSwitch()}
      </Paper>
    </Grid>
  );
};

export default App;
