import { Grid } from "@material-ui/core";
import "./index.css";
export const Search = (props) => {
  return (
    <Grid item xs={10} md={6}>
      <input
        type="text"
        value={props.value}
        className="search"
        onChange={props.onChange}
        placeholder="Busca artista/canción"
      />
    </Grid>
  );
};
