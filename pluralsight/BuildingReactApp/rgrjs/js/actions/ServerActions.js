import ActionDispatcher from "../ActionDispatcher";
import { ActionTypes } from "../Constants";

let ServerActions = {
    receiveLinks(links) {
        console.log("2. In ServerActions");
        ActionDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_LINKS,
            links
        });
    }
};

export default ServerActions;