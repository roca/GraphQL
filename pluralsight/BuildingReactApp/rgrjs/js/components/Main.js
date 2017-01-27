import React from "react";
import API from "../API";
import LinkStore from "../stores/LinkStore";

let _getAppState = () => {
    return { links: LinkStore.getAll() };
}
class Main extends React.Component {

   static propTypes = {
        limit: React.PropTypes.number
    }

   static defaultProps = {
        limit: 3
    } 

  state = _getAppState();
  onChange = () => {
        console.log("4. In the View");
        this.setState(_getAppState());
    }

   componentDidMount() {
        API.fetchLinks();
        LinkStore.on("change",this.onChange);
    }

    componentWillUnmount() {
        LinkStore.removeListener("change",this.onChange);
    }
   
    render() {
        let content = this.state.links.slice(0,this.props.limit).map(link => {
            return <li key={link._id}>
                        <a target="_blank" href={link.url}>{link.title}</a>
                    </li>;
        });
        return (
            <div>
            <h3>Links</h3>
            <ul>
                { content }
            </ul>
            </div>
        );
    };    
};


export default Main;