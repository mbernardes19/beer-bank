import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Favourite from './Favourite';

export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        //
        //NÃO ESQUECER DE ADICIONAR O BASEURL
        //
        const baseUrl = '/beer-bank';
        return(
            <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route path={'/'} exact={true} component={Home}/>
                    <Route path= {'/favourite'} component={Favourite}/>
                </Switch>
            </BrowserRouter>
            </React.Fragment>
        );
    }


}

ReactDOM.render(<App/>, document.getElementById('app'));