import React from 'react';
import List from './List';
import { Item } from 'semantic-ui-react';

function Lists({lists, dispatch}) {
    return (
        <div>
            <Item.Group>
                {lists.map((item) =>  (
                    <List key={item.id} {...item} dispatch={dispatch} />
                ))}
            </Item.Group> 
        </div>
    )
}

export default Lists
