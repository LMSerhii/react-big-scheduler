import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginTop: theme.spacing(2)
  },
  teamMember: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));
