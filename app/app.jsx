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
	   <Route path="students" component={Students}/>
	   <Route path="add_students" component={Students}/>
	   <Route path="teachers" component={Teachers}/>
	   <Route path="add_teacher" component={Teachers}/>
	   <Route path="parents" component={Teachers}/>
	   <Route path="class" component={Teachers}/>
	   <Route path="subjects" component={Teachers}/>
	   <Route path="fees" component={Teachers}/>
	   <Route path="attendance" component={Teachers}/>
	   <Route path="exam" component={Teachers}/>
	   <Route path="library" component={Teachers}/>
	   <Route path="accounting" component={Teachers}/>
	   <Route path="transport" component={Teachers}/>
	   <Route path="notice" component={Teachers}/>
	   <Route path="notice" component={Teachers}/>
	   <IndexRoute component={Login}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
