import {
  ListItem,
  List as MUIList,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Grid,
  Grow,
  Typography,
} from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { Search } from "components/Search";
import { SearchContainer } from "components/SearchContainer";
import { useState } from "react";

const List = ({ songs, handleAddSongToPlayer }) => {
  const [valueSearch, setValueSearch] = useState("");
  return (
    <>
      <Grid container>
        <Grid item xs={1} md={3} />
        <Search
          value={valueSearch}
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
        />
        <Grid item xs={12} style={{ marginTop: "24px" }}>
          <MUIList>
            <Grid container>
              <SearchContainer
                search={valueSearch}
                options={songs}
                searchParams={["name", "singer"]}
                template={(song, index) => {
                  return (
                    <Grow
                      in={true}
                      timeout={index === 0 ? 200 : (index + 1) * 200}
                      key={`song-${song.name}`}
                    >
                      <Grid item xs={12}>
                        <ListItem key={song._id}>
                          <ListItemAvatar>
                            <Avatar alt={song.name} src={song.cover} />
                          </ListItemAvatar>
                          <ListItemText>
                            {song.name} - {song.singer}
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <Button
                              onClick={() => {
                                handleAddSongToPlayer(song);
                              }}
                              variant="contained"
                              color="primary"
                            >
                              <PlaylistAddIcon />
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Grid>
                    </Grow>
                  );
                }}
                notFound={() => (
                  <Grid item xs={12}>
                    <Typography variant="h2" align="center">
                      No se ha encontrado ninguna cancion/cantante por "
                      {valueSearch}"
                    </Typography>
                  </Grid>
                )}
                empty={() => (
                  <Grid item xs={12}>
                    <Typography variant="h2" align="center">
                      No se ha encontrado ninguna cancion
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
          </MUIList>
        </Grid>
      </Grid>
    </>
  );
};

export { List };
