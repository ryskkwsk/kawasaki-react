const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding:
      `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px ` +
      `${theme.spacing.unit * 4}px`
  },
  buttons: {
    marginTop: theme.spacing.unit * 4
  },
  github: {
    marginRight: 5
  }
});

export default styles;
