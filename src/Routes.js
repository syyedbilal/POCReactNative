import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import List from './pages/List';
import Listname from './pages/Listname';
import Dashboard from './pages/Dashboard';
import Loading from './pages/Loading';
import Googleformmap from './pages/Googleformmap';


export default class Routes extends Component{
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login"/>
			      <Scene key="signup" component={Signup} title="Register"/>
				  <Scene key="list" component={List} title="List"/>
				  <Scene key="listname" component={Listname} title="Listname"/>
				  <Scene key="dashboard" component={Dashboard} title="Dashboard"/>
				  <Scene key="googleformmap" component={Googleformmap} title="Googleformmap"/>
				  <Scene key="loading" component={Loading} title="Loading" initial={true}/>
			    </Stack>
			 </Router>
			)
	}
}