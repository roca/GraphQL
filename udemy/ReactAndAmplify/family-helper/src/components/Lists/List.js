import React ,{ useState, useEffect } from 'react';
import { Item, Icon } from 'semantic-ui-react';

import { Storage } from 'aws-amplify'

import {actions} from '../../Actions';

function List(props) {
    const {id, title, description, imageKey, createdAt, dispatch} = props
    const [imageUrl, setImageUrl] = useState('https://react.semantic-ui.com/images/wireframe/image.png');

    async function fetchImageUrl() {
        const imgUrl = await Storage.get(imageKey);
        setImageUrl(imgUrl);
    }

    useEffect(() => {
        if (imageKey) {
           fetchImageUrl();
        }
    }, [])

    return (
        <Item>
            <Item.Image 
            size="tiny"
            src={imageUrl}/>
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
