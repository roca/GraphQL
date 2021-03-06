import React from 'react';
import ListHeader from './components/headers/ListHeader';

function List(props) {
    console.log(props); 
    const slug = props.match.params.slug;
    return (
        <div>
            <ListHeader/>
            <h1>
                This is the List Page for {slug}
            </h1>
        </div>
    );
}

export default List
