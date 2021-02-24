import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react';
import {API, graphqlOperation} from 'aws-amplify';
import { useState } from 'react';

import {actions} from '../../Actions';

import { createList, updateList } from '../../graphql/mutations'
import UploadImage from '../HandleImages/UploadImage';
import { useS3 } from '../../hooks/useS3';




function ListModal({state, dispatch}) {
    const [uploadToS3] = useS3();
    const [fileToUpload, setFileToUpload] = useState()

    async function saveList() {
        const imageKey = uploadToS3(fileToUpload);
        console.log('imageKey: ',imageKey)
        const { title, description } = state
        const result = await API.graphql(graphqlOperation(createList, { input: { title, description , imageKey} })); 
        dispatch({type: actions.CLOSE_MODAL});
        console.log('Saved data with result: ', result);
    }
    
    async function editList() {
        const { id, title, description } = state
        const result = await API.graphql(graphqlOperation(updateList, { input: { id, title, description } })); 
        dispatch({type: actions.CLOSE_MODAL});
        console.log('Edit data with result: ', result);
    }
    
    function getSelectedFile(fileName) {
      setFileToUpload(fileName)
    }

    return (
        <Modal open={state.isModalOpen} dimmer="blurring">
            <Modal.Header>
                { state.modalType === 'add' ? 'Create' : 'Edit' } your list
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Input 
                    error={true ? false : {content: "please add a name to your list"}}
                    label="Title" 
                    placeholder="My pretty list"
                    value={state.title}
                    onChange={(e) => dispatch({ type: actions.TITLE_CHANGE, value: e.target.value })}
                    ></Form.Input>
                    <Form.TextArea 
                    label="Description"
                    placeholder="Things that my pretty list is about"
                    value={state.description}
                    onChange={(e) => dispatch({ type: actions.DESCRIPTION_CHANGE, value: e.target.value })}
                    ></Form.TextArea>
                    <UploadImage getSelectedFile={getSelectedFile} />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => dispatch({ type: actions.CLOSE_MODAL})}>Cancel</Button>
                <Button positive onClick={ state.modalType === 'add' ? saveList : editList }>
                    { state.modalType === 'add' ? 'Save' : 'Update' }
                </Button>
            </Modal.Actions>
        </Modal>            
    )
}

export default ListModal
