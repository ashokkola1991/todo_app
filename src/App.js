import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import Products from './pages/Products';
import Tasks from './pages/Tasks';
import Error from './pages/Error';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/" exact>
            <Products />
          </Route>
          <Route path="*" component={Error}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
