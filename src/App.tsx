import { useState } from "react";
import "./App.css";
import { Grid, Tab, Tabs, Typography } from "@mui/material";
import AppHead from "./components/AppHead";

const App = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"flex-start"}
      alignItems={"stretch"}
    >
      <AppHead tab={tab} handleTabChange={handleTabChange} />
      <Grid item alignItems={"center"} justifyContent={"center"}></Grid>
    </Grid>
  );
};

export default App;
