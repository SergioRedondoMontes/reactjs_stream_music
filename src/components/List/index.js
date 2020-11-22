import {
  ListItem,
  List as MUIList,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const List = ({ songs, handleAddSongToPlayer }) => {
  return (
    <MUIList>
      {songs.map((song) => (
        <ListItem key={song._id}>
          <ListItemAvatar>
            <Avatar alt={song.name} src={song.cover} />
          </ListItemAvatar>
          <ListItemText>{song.name}</ListItemText>
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
      ))}
    </MUIList>
  );
};

export { List };
