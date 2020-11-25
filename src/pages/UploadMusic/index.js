import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import MusicServices from "services/music.services";

const UploadMusic = () => {
  const [song, setSong] = useState(null);
  const musicServices = new MusicServices();
  const handleAddSong = (event) => {
    setSong(event.target.files[0]);
  };

  const handleUploadSong = () => {
    musicServices
      .uploadMusic(song)
      .then((res) => {
        console.log("response", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/*".mp3*" */}
        <input type="file" name="song" onChange={handleAddSong} />
        <Button
          variant="contained"
          color="primary"
          disabled={song !== null ? false : true}
          onClick={handleUploadSong}
        >
          Subir canción
        </Button>
      </Grid>
    </Grid>
  );
};

export { UploadMusic };
