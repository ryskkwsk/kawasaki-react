const styles = theme => ({
  main: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing.unit * 8,
      marginRight: theme.spacing.unit * 8
    }
  },
  toolbar: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    margin: `5px ${theme.spacing.unit * 1}px`,
    [theme.breakpoints.up("md")]: {
      margin: `5px ${theme.spacing.unit * 8}px`
    }
  },
  logo: {
    fontWeight: "bold",
    color: "white"
  },
  logout: {
    size: "small",
    raised: true
  },
  loading: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 6
  },
  toastMessage: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.palette.primary[100],
    borderRadius: 5,
    margin: `${theme.spacing.unit * 2}px 0`,
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  searchField: {
    [theme.breakpoints.up("md")]: {
      width: 800
    }
  },
  newButton: {
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing.unit * 3,
      width: "100%"
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing.unit * 3
    }
  },
  itemForm: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center"
  },
  itemFormTitle: {
    fontWeight: "bold",
    paddingLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing.unit * 5
    }
  },
  itemFormImage: {
    width: 300,
    height: 300,
    border: "solid 1px #ccc",
    margin: "0 auto",
    marginBottom: theme.spacing.unit * 2
  },
  formImage: {
    display: "block",
    maxHeight: 300,
    maxWidth: 300,
    margin: "0 auto",
    marginBottom: theme.spacing.unit * 2
  },
  formImageButtons: {
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing.unit * 2,
      borderBottom: "solid 1px #ccc"
    }
  },
  itemCardList: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center"
    },
    marginTop: theme.spacing.unit * 4
  },
  card: {
    width: 300,
    marginBottom: theme.spacing.unit * 4,
    cursor: "pointer",
    transition: "all .5s",
    "&:hover": {
      transform: "translateY(-7px)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, .19), 0 6px 6px rgba(0, 0, 0, .23)"
    }
  },
  cardTitle: {
    width: 200,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "bold"
  },
  cardMedia: {
    width: 280,
    height: 280,
    border: "solid 1px #ccc",
    margin: "0 auto"
  },
  cardImage: {
    display: "block",
    maxHeight: 280,
    maxWidth: 280,
    margin: "0 auto"
  },
  cardText: {
    height: 100,
    display: "-webkit-box",
    overflow: "hidden",
    lineClamp: 5,
    boxOrient: "vertical",
    marginBottom: 10
  },
  deleteDialog: {
    margin: theme.spacing.unit * 3
  },
  trash: {
    float: "right"
  },
  edit: {
    float: "right"
  }
});

export default styles;
