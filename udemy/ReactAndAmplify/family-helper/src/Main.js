import React from 'react'
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
import { deleteList } from './graphql/mutations';
import { onCreateList, onDeleteList, onUpdateList } from './graphql/subscriptions';

import {actions} from './Actions';

Amplify.configure(awsConfig);


const intialState = {
  id: '',
  title: '',
  description: '',
  lists: [],
  isModalOpen: false,
  modalType: ''
}
function listReducer(state = intialState, action) {
  let newList;
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
      return {...state, isModalOpen: false, id: '', title: '', description: '' }
    case actions.DELETE_LIST:
      console.log(action.value);
      deleteListById(action.value);
      return {...state}
    case actions.DELETE_LIST_RESULT:
      newList = state.lists.filter(item => item.id !== action.value);
      return {...state, lists: newList}
    case actions.EDIT_LIST:
      console.log(action.value);
      const newValue = {...action.value}
      delete newValue.children;
      delete newValue.listItems;
      delete newValue.dispatch;
      console.log(newValue); 
      return {...state, isModalOpen: true, modalType: 'edit', id: newValue.id, title: newValue.title, description: newValue.description}
    case actions.UPDATE_LIST_RESULT:
      const index = state.lists.findIndex(item => item.id === action.value.id);
      newList = [...state.lists];
      delete action.value.listItems;
      newList[index] = action.value;
      return {...state, lists: newList}
    default:
      console.log('Default action for', action);
      return state
  }
}

async function deleteListById(id) {
  const result = await API.graphql(graphqlOperation(deleteList, {input: {id}}))
  console.log('delete', result);
}


function Main() {
  const [state, dispatch] = useReducer(listReducer, intialState);
  
  async function fetchList() {
    try {
      const { data } = await API.graphql(graphqlOperation(listLists));
      dispatch({ type: actions.UPDATE_LISTS, value: data.listLists.items })
    } catch(err) {
      console.log('error: ', err)
    }
  }

  
  useEffect(() => {
     fetchList();
  }, []);

  useEffect(() => {

    const createListSub = API
    .graphql(graphqlOperation(onCreateList))
    .subscribe({
      next: ({_, value}) => {
        console.log('onCreateList called');
        dispatch({type: actions.UPDATE_LISTS, value: [value.data.onCreateList]})
      }
    });

    const updateListSub = API
    .graphql(graphqlOperation(onUpdateList))
    .subscribe({
      next: ({_, value}) => {
        console.log('onUpdateList called', value);
        dispatch({type: actions.UPDATE_LIST_RESULT, value: value.data.onUpdateList })
      }
    });

    const deleteListSub = API
    .graphql(graphqlOperation(onDeleteList))
    .subscribe({
      next: ({_, value}) => {
        console.log('onDeleteList called');
        dispatch({type: actions.DELETE_LIST_RESULT, value: value.data.onDeleteList.id })
      }
    });


    return () => {
      createListSub.unsubscribe();
      deleteListSub.unsubscribe();
      updateListSub.unsubscribe();
    }

  }, []);


  return (
    <AmplifyAuthenticator>
      <Container style={{height: '100vh'}}>
        <AmplifySignOut />
        <Button className="floatingButton" onClick={() => dispatch({type: actions.OPEN_MODAL})}>
          <Icon name="plus" className="floatingButton_icon"/>
        </Button>
        <div className="App">
          <MainHeder />
            <Lists lists={state.lists} dispatch={dispatch}/>
        </div>
      </Container>
      <ListModal state={state} dispatch={dispatch}/>
    </AmplifyAuthenticator>
  );
}

export default Main;
