import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  progressItem: {
    marginBottom: theme.spacing(2)
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(0.5)
  },
  progress: {
    height: 8,
    borderRadius: 4
  },
  card: {
    height: "100%"
  },
  cardContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  chartContainer: {
    flex: 1,
    minHeight: 200
  }
}));
