import { ActionTypes, ArtistSongs, SongsAction } from "../actions";
export default (state: ArtistSongs[] = [], action: SongsAction) => {
    switch (action.type) {
        case ActionTypes.FETCH_SONGS:
            return action.payload;
        default:
            return state;
    }
};
