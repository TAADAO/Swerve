// import React, { Component } from 'react';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//          This is Swerve main page. The Front end files are now in clients folder. 
//          </header>
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login"

class App extends Component {
  render() {
    return (
     
      <Router>
      <div>
        
     
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/filter" component={Filter} />
          <Route component={NoMatch} /> */}
        
      </div>
    </Router>
    );
    
  }
}


export default App;
