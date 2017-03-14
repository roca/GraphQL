import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Quote from './quote';

class QuoteLibrary extends React.Component{
    state = { allQuotes: [] };

    componentDidMount() {
        fetch(`/graphql?query={
            allQuotes{
                id,
                text,
                author
            }
        }`)
        .then(response => response.json())
        .then(json => this.setState(json.data))
        .catch(ex => console.error(ex));
    }

    render() {
        return (
            <div className="quotes-list">
                {this.state.allQuotes.map(quote => <Quote key={quote.id} quote={quote} />)}
            </div>
        )
    }
}

QuoteLibrary = Relay.createContainer(QuoteLibrary, {
    fragments: {}
});

class AppRoute extends Relay.Route {
    static routeName = 'App';
}

console.log(
    Relay.QL `query AllQuotes {
        allQuotes {
            id
            text
            author
        }
    }`
);

ReactDOM.render(<Relay.RootContainer 
                    Component={QuoteLibrary} 
                    route={new AppRoute()}
                />, document.getElementById('react'));



