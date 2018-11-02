// import React from 'react';
// import Sovrin from './Sovrin'
// import ReactDOM from "react-dom";

// ReactDOM.render(<Sovrin />, document.getElementById("index"));

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import App from './App';
import DidLookup from './components/DidLookup';
import registerServiceWorker from './registerServiceWorker';
//import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
           <Router>
           <div>
             <Route exact path="/" component={App}/>
             {/* <Route exact path="/didlookup" component={DidLookup}/> */}
           </div>
         </Router>
), document.getElementById('root'));
registerServiceWorker();