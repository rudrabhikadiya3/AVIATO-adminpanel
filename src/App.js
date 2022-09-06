import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout'
import Product from './container/Product';
import configureStore from './redux/store';

function App() {
  const store = configureStore()
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path='/product' component={Product} />
          </Switch>
        </Layout>
      </Provider>
    </>
  );
}

export default App;
