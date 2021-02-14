import React from 'react';
import { Item, Icon } from 'semantic-ui-react';

import {actions} from '../../Actions';

function List(props) {
    const {id, title, description, createdAt, dispatch} = props
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
                    <Icon name="edit" className="ml-3" onClick={() => dispatch({type: actions.EDIT_LIST, value: props})}/>
                    <Icon name="trash" onClick={() => dispatch({type: actions.DELETE_LIST, value: id})}/>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
}

export default List
