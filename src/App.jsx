// import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Nav current="home" />
      <Switch>
        <Route path="/about" component={AboutPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
