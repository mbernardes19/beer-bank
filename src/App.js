import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, Router, Link} from 'react-router-dom';
import Home from './Home';
import Favourite from './Favourite';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import BeerCard from './BeerCard';
import AdvSearch from './AdvSearch';


export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const baseUrl = process.env.PUBLIC_URL;
        return(
            <HashRouter>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path= '/favourite' component={Favourite}/>
                    <Route path='/advanced-search' component={AdvSearch}/>
                </Switch>
            </HashRouter>
        );
    }


}

ReactDOM.render(<App/>, document.getElementById('app'));