import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import AuthServices from "../../services/auth.services";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = (props) => {
  const classes = useStyles();
  const authServices = new AuthServices();
  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState("");

  const handleAlert = () => {
    switch (props.alert) {
      case "email":
        return <Alert severity="error">Email incorrecto</Alert>;
      case "password":
        return <Alert severity="error">Email o contraseña incorrectos</Alert>;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authServices
      .login({ email, password })
      .then((res) => {
        console.log("response", res);
        alert("funciona");
      })
      .catch((err) => {
        console.log("error", err);
        alert("no funciona");
      });
  };
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {handleAlert()}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar sesión
            </Button>
            <Button variant="text" component={Link} to="/signup">
              Crear una nueva cuenta
            </Button>
            <Box mt={5}>
              <Typography variant="body2" color="textSecondary" align="center">
                {`Copyright © STREAM MUSIC | SERGIO ADRI ${new Date().getFullYear()}`}
              </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
