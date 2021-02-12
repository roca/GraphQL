import React from 'react';
import { Item, Icon } from 'semantic-ui-react';

import {actions} from '../../Actions';

function List({id, title, description, createdAt, dispatch}) {
    return (
        <Item>
            <Item.Image 
            size="tiny"
            src="https://react.semantic-ui.com/images/wireframe/image.png"/>
            <Item.Content>
                <Item.Header>{title}</Item.Header>
                <Item.Description>{description}</Item.Description>
                <Item.Extra>
                    {new Date(createdAt).toDateString()}
                    <Icon name="trash" className="ml-3" onClick={() => dispatch({type: actions.DELETE_LIST, value: id})}/>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
}

export default List
