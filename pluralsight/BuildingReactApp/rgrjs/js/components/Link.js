import React from "react";
import Relay from "react-relay";

class Link extends React.Component {
    render() {
        let {link} = this.props;
        return (
            <li>
              <a target="_blank" href={link.url}>{link.title}</a>
            </li>
        );
    }
}

Link = Relay.createContainer(Link, {
    fragments: {
       link: () => Relay.QL `
            fragment on Link {
                title,
                url
            }
       `
    }
});

export default Link;