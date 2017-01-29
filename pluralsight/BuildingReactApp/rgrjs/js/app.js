import React from "react";
import  ReactDOM from "react-dom";
import Relay from "react-relay";

import Main from "./components/Main";

ReactDOM.render(<Main />, document.getElementById('react'));

console.log(
    Relay.QL`
        query Test {
            links {
                title
            }
        }
    `
);