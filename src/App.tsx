import { useEffect, useState } from "react";
import "./App.css";
import { Button, Grid, Paper } from "@mui/material";
import AppHead from "./components/AppHead";
import Backlog from "./components/Backlog.tsx";
import { TaskRepository, addTask, getAllTasks } from "./db/tasksRepository.ts";

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

  const handleAddTask = () => {
    addTask({
      title: "Test1",
      project_id: undefined,
      description: undefined,
      priority: 0,
      assigned: false,
      create_date: new Date(),
      deadline: new Date("2024-10-10"),
    });
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
      <Button onClick={handleAddTask}>TestDB</Button>
      <Button
        onClick={() => {
          const dataa = getAllTasks().data;
          console.log(dataa);
        }}
      >
        repo
      </Button>
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
