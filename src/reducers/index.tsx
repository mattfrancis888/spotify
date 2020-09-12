import { combineReducers } from "redux";
import artistsReducer from "./artistsReducer";
import { Artist, ArtistSongs } from "../actions";
import songsReducer from "./songsReducer";
export interface StoreState {
    artists: Artist[];
    artistSongs: ArtistSongs[];
}
export default combineReducers<StoreState>({
    artists: artistsReducer,
    artistSongs: songsReducer,
});
