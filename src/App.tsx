import { useState } from "react";
import "./App.css";
import { Grid, Paper } from "@mui/material";
import AppHead from "./components/AppHead";
import Backlog from "./components/Backlog.tsx";

const App = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabSwitch = () => {
    switch (tab) {
      case 0:
        return <></>;
      case 1:
        return (
          <>
            <Backlog />
          </>
        );
      case 2:
        return <></>;
      case 3:
        return <></>;
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
      <AppHead tab={tab} handleTabChange={handleTabChange} />

      <Paper
        elevation={4}
        sx={{
          borderRadius: 2.5,
          marginLeft: "1rem",
          marginRight: "1rem",
          marginBottom: "1rem",
          height: "88%",
          width: "98%",
        }}
      ></Paper>
    </Grid>
  );
};

export default App;
