import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Favourite from './Favourite';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';


export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const baseUrl = '/beer-bank';
        return(
            <React.Fragment>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <BrowserRouter>
                        <Switch>
                            <Route path={'/'} exact={true} component={Home}/>
                            <Route path= {'/favourite'} component={Favourite}/>
                        </Switch>
                    </BrowserRouter>
                </MuiPickersUtilsProvider>
            
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));