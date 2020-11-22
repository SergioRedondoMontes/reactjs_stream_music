import { Grid, Slider, Typography } from "@material-ui/core";
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
        <Grid item xs={6} md={1}>
          <Grid container>
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
        <Grid item xs={12}>
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
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SkipPreviousIcon
            fontSize="large"
            color={position === 0 ? "disabled" : "inherit"}
            onClick={() => {
              if (position > 0) {
                handleChangeSong(position - 1);
              }
            }}
          />
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
          <SkipNextIcon
            fontSize="large"
            color={position === urls.length - 1 ? "disabled" : "inherit"}
            onClick={() => {
              if (position < urls.length) {
                handleChangeSong(position + 1);
              }
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
