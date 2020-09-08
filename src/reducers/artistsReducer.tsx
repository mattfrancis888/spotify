import { ActionTypes, Artist, FetchArtistsAction } from "../actions";
export default (state: Artist[] = [], action: FetchArtistsAction) => {
    switch (action.type) {
        case ActionTypes.FETCH_ARTISTS:
            return action.payload;
        default:
            return state;
    }
};
