import { Grid, Typography } from "@material-ui/core";
import { List } from "components/List";
import { Player } from "components/Player";
import { useEffect, useState } from "react";
import MusicServices from "services/music.services";

const MusicPlayer = (props) => {
  const [songs, setSongs] = useState([]);
  const [songsList, setSongsList] = useState([]);

  useEffect(() => {
    const musicServices = new MusicServices();
    musicServices.getMusic().then((response) => {
      setSongsList(response);
    });
  }, []);
  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={songs.length > 0 ? 12 : false}
        md={songs.length > 0 ? 8 : false}
      >
        {songs.length > 0 && <Player songs={songs} />}
      </Grid>
      <Grid
        item
        xs={12}
        md={songs.length > 0 ? 4 : 12}
        style={{ boxShadow: "-10px 0px 10px 1px #111" }}
      >
        <Grid container>
          {songs.length === 0 && (
            <Grid item xs={12} style={{ margin: "24px 0" }}>
              <Typography variant="h5" align="center">
                Bienvenido a Spotify
              </Typography>{" "}
              <Typography variant="h6" align="center">
                Selecciona una cancion de la lista o utiliza el buscador
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} style={{ marginTop: "24px" }}>
            <List
              songs={songsList}
              handleAddSongToPlayer={(song) => {
                setSongs([...songs, song]);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export { MusicPlayer };
