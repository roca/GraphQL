import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsConfig from './aws-exports';
import {AmplifyAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import { useEffect, useState, useReducer } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Icon, Modal, Form } from 'semantic-ui-react';

import MainHeder from './components/headers/MainHeader';
import Lists from './components/Lists/Lists';

import {listLists} from './graphql/queries';
import { createList } from './graphql/mutations';

Amplify.configure(awsConfig);

const actions = {
  TITLE_CHANGE: 'TITLE_CHANGE',
  DESCRIPTION_CHANGE: 'DESCRIPTION_CHANGE'
}

const intialState = {
  title: '',
  description: ''
}
function listReducer(state = intialState, action) {
  switch (action.type) {
    case actions.DESCRIPTION_CHANGE:
      return {...state, description: action.value}
    case actions.TITLE_CHANGE:
      return {...state, title: action.value}
    default:
      console.log('Default action for', action);
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(listReducer, intialState);

  const [lists, setLists] = useState([]);
  const [isModalOpen, setISModalOpen] = useState(false);
  
  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    setLists(data.listLists.items);
    console.log(data);
  }
  useEffect(() => {
     fetchList();
  }, []);

  function toggleModal(shouldOpen) {
   setISModalOpen(shouldOpen);
  }

  async function saveList() {
    const { title, description } = state
    const result = await API.graphql(graphqlOperation(createList, { input: { title, description } })); 
    toggleModal(false);
    console.log('Saved data with result: ', result);
  }

  return (
    <AmplifyAuthenticator>
      <Container style={{height: '100vh'}}>
        <AmplifySignOut />
        <Button className="floatingButton" onClick={() =>toggleModal(true)}>
          <Icon name="plus" className="floatingButton_icon"/>
        </Button>
        <div className="App">
          <MainHeder />
          <ul>
            <Lists lists={lists} />
          </ul>
        </div>
      </Container>
      <Modal open={isModalOpen} dimmer="blurring">
        <Modal.Header>Create your list</Modal.Header>
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
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() =>toggleModal(false)}>Cancel</Button>
          <Button positive onClick={saveList}>Save</Button>
        </Modal.Actions>
      </Modal>
    </AmplifyAuthenticator>
  );
}

export default App;
