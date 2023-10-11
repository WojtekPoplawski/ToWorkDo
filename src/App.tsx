import "./App.css";
import { Grid, Typography } from "@mui/material";

const App = () => {
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"flex-start"}
      alignItems={"stretch"}
    >
      <Grid
        item
        sx={{ backgroundColor: "#7315b8", height: "4em", padding: "1em" }}
      >
        <Typography variant={"h5"}>ToWorkDo</Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default App;
