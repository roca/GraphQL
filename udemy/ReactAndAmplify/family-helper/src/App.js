import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsConfig from './aws-exports';
import {AmplifyAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import { useEffect, useReducer } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Icon, Modal, Form } from 'semantic-ui-react';

import MainHeder from './components/headers/MainHeader';
import Lists from './components/Lists/Lists';

import {listLists} from './graphql/queries';
import { createList, deleteList } from './graphql/mutations';
import { onCreateList, onDeleteList } from './graphql/subscriptions';

import {actions} from './Actions';

Amplify.configure(awsConfig);


const intialState = {
  title: '',
  description: '',
  lists: [],
  isModalOpen: false
}
function listReducer(state = intialState, action) {
  switch (action.type) {
    case actions.DESCRIPTION_CHANGE:
      return {...state, description: action.value}
    case actions.TITLE_CHANGE:
      return {...state, title: action.value}
    case actions.UPDATE_LISTS:
      return { ...state, lists: [...action.value, ...state.lists] }
    case actions.OPEN_MODAL:
      return {...state, isModalOpen: true}
    case actions.CLOSE_MODAL:
      return {...state, isModalOpen: false, title: '', description: '' }
    case actions.DELETE_LIST:
      console.log(action.value);
      deleteListById(action.value);
      return {...state}
    case actions.DELETE_LIST_RESULT:
      const newList = state.lists.filter(item => item.id !== action.value);
      return {...state, lists: newList}
    case actions.EDIT_LIST:
      console.log(action.value);
      const newValue = {...action.value}
      delete newValue.children;
      delete newValue.listItems;
      delete newValue.dispatch;
      console.log(newValue); 
      return {...state}
    default:
      console.log('Default action for', action);
      return state
  }
}

async function deleteListById(id) {
  const result = await API.graphql(graphqlOperation(deleteList, {input: {id}}))
  console.log('delete', result);
}


function App() {
  const [state, dispatch] = useReducer(listReducer, intialState);
  
  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    dispatch({ type: actions.UPDATE_LISTS, value: data.listLists.items })
  }

  
  useEffect(() => {
     fetchList();
  }, []);

  useEffect(() => {
    let createListSub = API
    .graphql(graphqlOperation(onCreateList))
    .subscribe({
      next: ({provider, value}) => {
        console.log(value);
        dispatch({type: actions.UPDATE_LISTS, value: [value.data.onCreateList]})
      }
    });

    let deleteListSub = API
    .graphql(graphqlOperation(onDeleteList))
    .subscribe({
      next: ({provider, value}) => {
        console.log(value);
        dispatch({type: actions.DELETE_LIST_RESULT, value: value.data.onDeleteList.id })
      }
    });

    return () => {
      createListSub.unsubscribe();
      deleteListSub.unsubscribe();
    }

  }, []);

  async function saveList() {
    const { title, description } = state
    const result = await API.graphql(graphqlOperation(createList, { input: { title, description } })); 
    dispatch({type: actions.CLOSE_MODAL});
    console.log('Saved data with result: ', result);
  }

  return (
    <AmplifyAuthenticator>
      <Container style={{height: '100vh'}}>
        <AmplifySignOut />
        <Button className="floatingButton" onClick={() => dispatch({type: actions.OPEN_MODAL})}>
          <Icon name="plus" className="floatingButton_icon"/>
        </Button>
        <div className="App">
          <MainHeder />
          <ul>
            <Lists lists={state.lists} dispatch={dispatch}/>
          </ul>
        </div>
      </Container>
      <Modal open={state.isModalOpen} dimmer="blurring">
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
          <Button negative onClick={() => dispatch({ type: actions.CLOSE_MODAL})}>Cancel</Button>
          <Button positive onClick={saveList}>Save</Button>
        </Modal.Actions>
      </Modal>
    </AmplifyAuthenticator>
  );
}

export default App;
