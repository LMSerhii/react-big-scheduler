import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius
  },
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    flexWrap: "wrap"
  },
  dateRange: {
    display: "flex",
    alignItems: "center"
  },
  dateInput: {
    width: 150
  },
  autoComplete: {
    width: 200
  },
  select: {
    minWidth: 150
  },
  clearButton: {
    color: theme.palette.grey[500],
    "&:hover": {
      color: theme.palette.error.main
    }
  }
}));
