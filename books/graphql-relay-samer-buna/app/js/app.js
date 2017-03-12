import React from 'react';
import ReactDOM from 'react-dom';

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

class App extends React.Component {
    static defaultProps = {
        greeting: 'Hello'
    };

    render() {
        return (
            <div>
                {this.props.greeting} World
            </div>
        );
    }

}

ReactDOM.render(<QuoteLibrary />, document.getElementById('react'));



