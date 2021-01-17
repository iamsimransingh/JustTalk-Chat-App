import React from 'react';
import Join from'./components/Join/Join';
import Chat from './components/Chat/Chat';
import {BrowserRouter as Router, Route} from 'react-router-dom';
const App = () => { 
    return(
 <Router> {/* component with two route  */}
     <Route path="/" exact component={Join} /> {/* first has path eqauls to route, passing component to be rendered called join */}
     <Route path="/chat" component={Chat} /> {/*second has chat componet rendered, user to be greeted with join component, pass his data in login form,data will be passed through the chat */}
 </Router>
);
}
export default App;