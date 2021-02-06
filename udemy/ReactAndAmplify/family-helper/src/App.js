import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsConfig from './aws-exports';
import {AmplifyAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import {listLists} from './graphql/queries';
import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Icon, Modal } from 'semantic-ui-react';

import MainHeder from './components/headers/MainHeader';

import Lists from './components/Lists/Lists';

Amplify.configure(awsConfig);

function App() {
  const [lists, setLists] = useState([]);
  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    setLists(data.listLists.items);
    console.log(data);
  }
  useEffect(() => {
     fetchList();
  }, []);
  return (
    <AmplifyAuthenticator>
      <AmplifySignOut />
      <Button className="floatingButton">
        <Icon name="plus" className="floatingButton_icon"/>
      </Button>
      <Container>
        <div className="App">
          <MainHeder />
          <ul>
            <Lists lists={lists} />
          </ul>
        </div>
      </Container>
    </AmplifyAuthenticator>
  );
}

export default App;
