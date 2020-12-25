import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "pages/SignUp";
import { MusicPlayer } from "pages/MusicPlayer";
import { UploadMusic } from "pages/UploadMusic";
import { Route, Switch } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

function App() {
  return (
    <ThemeProvider
      theme={createMuiTheme({
        palette: { type: "dark", primary: { main: "#81b71a" } },
      })}
    >
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={MusicPlayer} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/upload" exact component={UploadMusic} />
      </Switch>
    </ThemeProvider>
  );

  // return <MusicPlayer />;
  // return <UploadMusic />;
}

export default App;
