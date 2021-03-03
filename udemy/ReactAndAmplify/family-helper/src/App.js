import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Main from './Main'
import List from './List'

function App() {
  return (
   <BrowserRouter>
    <Switch>
      <Route path="/list">
        <List />
      </Route>
      <Route path="/" >
        <Main />
      </Route>
    </Switch>
   </BrowserRouter>
  )
}

export default App
