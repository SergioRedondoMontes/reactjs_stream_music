import { Grid } from "@material-ui/core";
import { List } from "components/List";
import { Player } from "components/Player";
import { useEffect, useState } from "react";
import MusicServices from "services/music.services";

const MusicPlayer = (props) => {
  const [songs, setSongs] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const musicServices = new MusicServices();
  useEffect(() => {
    musicServices.getMusic().then((response) => {
      setSongsList(response);
    });
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} md={songs.length > 0 ? 8 : false}>
        {songs.length > 0 && <Player songs={songs} />}
      </Grid>
      <Grid item xs={12} md={songs.length > 0 ? 4 : 12}>
        <List
          songs={songsList}
          handleAddSongToPlayer={(song) => {
            setSongs([...songs, song]);
          }}
        />
      </Grid>
    </Grid>
  );
};
export { MusicPlayer };
