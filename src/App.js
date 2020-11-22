import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "pages/SignUp";
import { Player } from "components/Player";
import { useState } from "react";
import { List } from "components/List";
import { MusicPlayer } from "pages/MusicPlayer";
import { UploadMusic } from "pages/UploadMusic";

function App() {
  const [songs, setSongs] = useState([]);

  // setTimeout(() => {
  //   setSong([
  //     ...song,
  //     "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3",
  //   ]);
  // }, 2000);

  // setTimeout(() => {
  //   setSong("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  // }, 10000);
  // return <Player songs={song} />;

  // return <MusicPlayer />;
  return <UploadMusic />;
}

export default App;
