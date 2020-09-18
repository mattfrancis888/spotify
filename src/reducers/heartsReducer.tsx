import { ActionTypes, Hearts, UpdateHeartsAction } from "../actions";
export default (state: Hearts[] = [], action: UpdateHeartsAction) => {
    switch (action.type) {
        case ActionTypes.UPDATE_HEARTS:
            return action.payload;
        default:
            return state;
    }
};
