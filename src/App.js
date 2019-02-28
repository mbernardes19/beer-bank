import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Router, Link} from 'react-router-dom';
import Home from './Home';
import Favourite from './Favourite';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import BeerCard from './BeerCard';

export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/favourite' component={Favourite}/>
                </Switch>
            </BrowserRouter>
        );
    }


}

ReactDOM.render(<App/>, document.getElementById('app'));