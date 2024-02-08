import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { TaskRepository } from "../db/tasksRepository.ts";
import { TimelogsRepository } from "../db/timelogsRepository.ts";
import { useTranslation } from "react-i18next";
import { secondsToSpend } from "./shared/Utlis.ts";

const Statistics = () => {
  const { t } = useTranslation();

  const [taskCount, setTaskCount] = useState(0);
  const [taskCountNone, setTaskCountNone] = useState(0);
  const [taskCountToDo, setTaskCountToDo] = useState(0);
  const [taskCountInProgress, setTaskCountInProgress] = useState(0);
  const [taskCountVerification, setTaskCountVerification] = useState(0);
  const [taskCountDone, setTaskCountDone] = useState(0);
  const [taskCountArchived, setTaskCountArchived] = useState(0);
  const [taskCountPriorityLowest, setTaskCountPriorityLowest] = useState(0);
  const [taskCountPriorityLow, setTaskCountPriorityLow] = useState(0);
  const [taskCountPriorityNormal, setTaskCountPriorityNormal] = useState(0);
  const [taskCountPriorityHigh, setTaskCountPriorityHigh] = useState(0);
  const [taskCountPriorityHighest, setTaskCountPriorityHighest] = useState(0);
  const [fastestTimeTaskName, setFastestTimeTaskName] = useState(
    t("not_found"),
  );
  const [slowestTimeTaskName, setSlowestTimeTaskName] = useState(
    t("not_found"),
  );
  const [fastestTimeTaskAmount, setFastestTimeTaskAmount] = useState(
    t("not_found"),
  );
  const [slowestTimeTaskAmount, setSlowestTimeTaskAmount] = useState(
    t("not_found"),
  );
  const [averageTimeTask, setAverageTimeTask] = useState(t("not_found"));
  const [projectCount, setProjectCount] = useState(0);
  const [averageTaskCountInProject, setAverageTaskCountInProject] = useState(0);

  const allTasks = TaskRepository.getAllTasks();
  const allTimelogs = TimelogsRepository.getAll();

  useEffect(() => {
    setTaskCountArchived(allTasks.filter((task) => task.hide).length);
    const averageTime = Math.round(
      allTimelogs.reduce((acc, timelog) => acc + timelog.time_spent, 0) /
        allTimelogs.length,
    )
    setAverageTimeTask(
      secondsToSpend(
        averageTime,
        t,
      ),
    );
    setProjectCount(new Set(allTasks.filter((task) => task.project_id)).size);
    setAverageTaskCountInProject(
      allTasks.filter((task) => task.project_id).length /
        new Set(allTasks.filter((task) => task.project_id)).size ===
        0
        ? 1
        : new Set(allTasks.filter((task) => task.project_id)).size,
    );
  }, [allTasks, allTimelogs]);

  TaskRepository.getTasksCount().then((result) => {
    setTaskCount(result);
  });
  TaskRepository.getTasksCountPerAssigned("none").then((result) => {
    setTaskCountNone(result);
  });
  TaskRepository.getTasksCountPerAssigned("todo").then((result) => {
    setTaskCountToDo(result);
  });
  TaskRepository.getTasksCountPerAssigned("working").then((result) => {
    setTaskCountInProgress(result);
  });
  TaskRepository.getTasksCountPerAssigned("verification").then((result) => {
    setTaskCountVerification(result);
  });
  TaskRepository.getTasksCountPerAssigned("done").then((result) => {
    setTaskCountDone(result);
  });
  TaskRepository.getTasksCountPerPriority(-2).then((result) => {
    setTaskCountPriorityLowest(result);
  });
  TaskRepository.getTasksCountPerPriority(-1).then((result) => {
    setTaskCountPriorityLow(result);
  });
  TaskRepository.getTasksCountPerPriority(0).then((result) => {
    setTaskCountPriorityNormal(result);
  });
  TaskRepository.getTasksCountPerPriority(1).then((result) => {
    setTaskCountPriorityHigh(result);
  });
  TaskRepository.getTasksCountPerPriority(2).then((result) => {
    setTaskCountPriorityHighest(result);
  });
  TimelogsRepository.getFastestTimelog().then((result) => {
    setFastestTimeTaskName(
      allTasks.find((task) => task.id === result?.task_id)?.title || "",
    );
    setFastestTimeTaskAmount(secondsToSpend(result?.time_spent || 0, t));
  });
  TimelogsRepository.getSlowestTimelog().then((result) => {
    setSlowestTimeTaskName(
      allTasks.find((task) => task.id === result?.task_id)?.title || "",
    );
    setSlowestTimeTaskAmount(secondsToSpend(result?.time_spent || 0, t));
  });

  return (
    <>
      <Grid
        container
        item
        sx={{ padding: "1rem" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCount}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_none")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountNone}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_todo")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountToDo}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_in_progress")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountInProgress}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_verification")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountVerification}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_done")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountDone}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_archived")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountArchived}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_priority_lowest")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountPriorityLowest}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_priority_low")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountPriorityLow}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_priority_normal")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountPriorityNormal}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_priority_high")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountPriorityHigh}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("task_count_priority_highest")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{taskCountPriorityHighest}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("fastest_time_task")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  paddingX: "0.5rem",
                  borderColor: "#979797",
                }}
              >
                <Typography variant="h5">{fastestTimeTaskName}</Typography>
                <Typography variant="h5">{fastestTimeTaskAmount}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("slowest_time_task")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                }}
              >
                <Typography variant="h5">{slowestTimeTaskName}</Typography>
                <Typography variant="h5">{slowestTimeTaskAmount}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("average_time_task")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                }}
              >
                <Typography variant="h5">{averageTimeTask}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("project_count")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">{projectCount}</Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ margin: "0.5rem" }}>
          <CardHeader title={t("average_task_count_in_project")} />
          <CardContent>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  borderColor: "#979797",
                  borderRadius: "45%",
                }}
              >
                <Typography variant="h4">
                  {averageTaskCountInProject}
                </Typography>
              </Paper>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
export default Statistics;
