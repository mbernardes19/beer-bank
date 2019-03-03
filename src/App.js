import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter, Switch, Route, Router, Link} from 'react-router-dom';
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
        const baseUrl = '/beer-bank';
        return(
            <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route path={baseUrl + '/'} exact={true} component={Home}/>
                    <Route path= {baseUrl + '/favourite'} component={Favourite}/>
                    <Route path={baseUrl + '/advanced-search'} component={AdvSearch}/>
                </Switch>
            </BrowserRouter>
            </React.Fragment>
        );
    }


}

ReactDOM.render(<App/>, document.getElementById('app'));