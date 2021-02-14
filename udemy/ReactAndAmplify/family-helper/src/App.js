import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsConfig from './aws-exports';
import {AmplifyAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import { useEffect, useReducer } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Icon } from 'semantic-ui-react';

import MainHeder from './components/headers/MainHeader';
import Lists from './components/Lists/Lists';
import ListModal from './components/modals/ListModal';

import {listLists} from './graphql/queries';
import { createList, deleteList } from './graphql/mutations';
import { onCreateList, onDeleteList } from './graphql/subscriptions';

import {actions} from './Actions';

Amplify.configure(awsConfig);


const intialState = {
  title: '',
  description: '',
  lists: [],
  isModalOpen: false,
  modalType: ''
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
      return {...state, isModalOpen: true, modalType: 'add'}
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
      return {...state, isModalOpen: true, modalType: 'edit', title: newValue.title, description: newValue.description}
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
      <ListModal state={state} dispatch={dispatch} saveList={saveList} />
    </AmplifyAuthenticator>
  );
}

export default App;
