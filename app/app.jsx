import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import Main from 'Main';
import Dashboard from 'Dashboard';
import Applications from 'Applications';
import Login from 'Login';
import Students from 'Students';
import Teachers from 'Teachers';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
	   <Route path="dashboard" component={Dashboard}/>
	   <Route path="applications" component={Applications}/>
	   <Route path="add_students" component={Students}/>
	   <Route path="teachers" component={Teachers}/>
	   <Route path="add_teacher" component={Teachers}/>
	   <IndexRoute component={Login}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
