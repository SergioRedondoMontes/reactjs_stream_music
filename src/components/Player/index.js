import { Grid, IconButton, Slider, Typography } from "@material-ui/core";
import { VolumeDown, VolumeUp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

// ICONS
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export const Player = ({ songs }) => {
  const [urls, setUrls] = useState("");

  const [play, setPlay] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [actualSong, setActualSong] = useState(songs[0]);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setUrls(songs);
  }, [songs]);

  const handleChangeSong = (newPosition) => {
    setPosition(newPosition);
    setActualSong(urls[newPosition]);
    console.log(actualSong);
  };

  return (
    <div>
      <ReactPlayer
        playing={play}
        url={actualSong?.musicSrc}
        width="0px"
        height="0px"
        volume={volume}
        progressInterval={1}
        onProgress={({ played, playedSeconds }) => {
          setPlayed(played);
          setPlayedSeconds(
            new Date(playedSeconds * 1000).toISOString().substr(14, 5)
          );
        }}
      />
      <Grid container style={{ padding: "16px" }}>
        <Grid item xs={6} md={11}>
          <Typography variant="body1">{actualSong.name}</Typography>
        </Grid>

        <Grid xs={false} md={3} />
        <Grid item xs={12} md={6}>
          <img
            src={actualSong.cover}
            width="100%"
            height="auto"
            alt={actualSong.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            {actualSong.name} - {actualSong.singer}
          </Typography>
          <Typography variant="h6" align="center">
            {playedSeconds}
          </Typography>
          <Slider
            step={0.001}
            value={played}
            onChange={(e, newValue) => {
              setPlayed(newValue);
            }}
            max={1}
            min={0}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid
          item
          xs={8}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            fontSize="large"
            color={position === 0 ? "disabled" : "inherit"}
            disabled={position === 0 ? true : false}
            onClick={() => {
              if (position > 0) {
                handleChangeSong(position - 1);
              }
            }}
          >
            <SkipPreviousIcon color={position === 0 ? "disabled" : "inherit"} />
          </IconButton>
          {play ? (
            <PauseIcon
              fontSize="large"
              onClick={() => {
                setPlay(!play);
              }}
            />
          ) : (
            <PlayArrowIcon
              fontSize="large"
              onClick={() => {
                setPlay(!play);
              }}
            />
          )}
          <IconButton
            fontSize="large"
            disabled={position === urls.length - 1 ? true : false}
            color={position === urls.length - 1 ? "disabled" : "inherit"}
            onClick={() => {
              if (position < urls.length) {
                handleChangeSong(position + 1);
              }
            }}
          >
            <SkipNextIcon
              color={position === urls.length - 1 ? "disabled" : "inherit"}
            />
          </IconButton>
        </Grid>
        <Grid item xs={false} md={11} />
        <Grid item xs={4} md={1}>
          <Grid container alignItems="center">
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider
                step={0.001}
                value={volume}
                onChange={(e, newValue) => {
                  setVolume(newValue);
                }}
                max={1}
                min={0}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
