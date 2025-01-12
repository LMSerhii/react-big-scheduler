import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: 120
  },
  resourceInfo: {
    width: 250,
    flexShrink: 0,
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1)
  },
  header: {
    marginBottom: theme.spacing(1)
  },
  name: {
    fontWeight: 600,
    marginBottom: theme.spacing(0.5)
  },
  metrics: {
    display: "flex",
    gap: theme.spacing(2)
  },
  metricItem: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.25)
  },
  utilization: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5)
  },
  utilizationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  utilizationBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.palette.grey[200],
    "& .MuiLinearProgress-bar": {
      borderRadius: 3
    }
  },
  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(0.5)
  },
  skillChip: {
    height: 20,
    fontSize: "0.75rem",
    backgroundColor: theme.palette.grey[100],
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  eventsContainer: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default
  }
}));
