import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout'
import Product from './container/Product';

function App() {
  return (
    <>
      <Layout>
        <Switch>
        <Route path='/product' component={Product}/>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
