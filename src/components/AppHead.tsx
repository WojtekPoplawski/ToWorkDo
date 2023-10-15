import { Grid, Tab, Tabs, Typography } from "@mui/material";

type AppHeadProps = {
  tab: number;
  handleTabChange: Function;
};

const AppHead = ({ tab, handleTabChange }: AppHeadProps) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "#e68f4c",
        height: "4em",
        paddingRight: "1em",
        paddingLeft: "1em",
      }}
    >
      <Grid item xs={3}>
        <Typography variant={"h5"}>ToWorkDo</Typography>
      </Grid>
      <Grid item xs={6}>
        <Tabs
          value={tab}
          onChange={(event, newValue) => handleTabChange(event, newValue)}
          variant="fullWidth"
        >
          <Tab label={"Tablica"} />
          <Tab label={"Backlog"} />
          <Tab label={"Time log"} />
          <Tab label={"Stats"} />
        </Tabs>
      </Grid>

      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default AppHead;
