import { ActionTypes, Artist, Actions } from "../actions";
export default (state: Artist[] = [], action: Actions) => {
    switch (action.type) {
        case ActionTypes.FETCH_ARTISTS:
            return action.payload;
        case ActionTypes.FETCH_ARTIST:
            return action.payload;

        default:
            return state;
    }
};
