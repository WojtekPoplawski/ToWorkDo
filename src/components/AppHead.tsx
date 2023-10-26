import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type AppHeadProps = {
  tab: number;
  handleTabChange: Function;
};

const AppHead = ({ tab, handleTabChange }: AppHeadProps) => {
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
      <Grid item xs={3}>
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

      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default AppHead;
