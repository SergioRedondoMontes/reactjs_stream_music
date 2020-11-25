import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Alert from "@material-ui/lab/Alert";
import { Link, useHistory } from "react-router-dom";
import AuthServices from "services/auth.services";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const authServices = new AuthServices();

  // ---------  START STATE
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    role: "user",
    password: "",
  });
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  // ---------  END STATE

  // ---------  START HANDLERS
  const handleAlert = (alert) => {
    switch (alert) {
      case "email-exists":
        return <Alert severity="error">Email ya existe</Alert>;
      default:
        return null;
    }
  };

  const handleEditUser = (event) => {
    const auxUser = { ...user, [event.target.name]: event.target.value };
    setUser(auxUser);
    checkDisabledSubmit(auxUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authServices
      .signup(user)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        alert("no funciona");
        console.log("err", err);
      });
  };

  // ---------  END HANDLERS

  // ---------  START LOGICS
  const checkDisabledSubmit = (auxUser) => {
    let disabled = false;
    Object.keys(auxUser).forEach((property) => {
      if (auxUser[property] === "") {
        disabled = true;
      }
    });
    setDisabledSubmit(disabled);
  };
  // ---------  END LOGICS

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear cuenta
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {handleAlert()}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                value={user.name}
                onChange={handleEditUser}
                id="name"
                label="Nombre"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="surname"
                value={user.surname}
                onChange={handleEditUser}
                label="Apellidos"
                name="surname"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={user.email}
                onChange={handleEditUser}
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={user.password}
                onChange={handleEditUser}
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={disabledSubmit}
            className={classes.submit}
          >
            Crear usuario
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">¿Ya tienes usuario? Ve a login</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {`Copyright © STREAM MUSIC | SERGIO ADRI ${new Date().getFullYear()}`}
        </Typography>
      </Box>
    </Container>
  );
};
