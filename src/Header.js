import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import BeerCard from './BeerCard';


export default class Header extends React.Component{
    constructor(props){
        super(props);
      
    }

    render(){
        return(
                <Grid  item xs={12}>
                    <header>
                        <h1>The Beer Bank</h1>
                        <p>Find your favorite beer here</p>
                        <input id='search-input' type='text' placeholder='Search for beer name'></input>
                        <nav>
                            <Link className='link' to="/">HOME</Link>
                            <Link className='link' to="/favourite">FAVOURITE</Link>
                        </nav>
                    </header>

                </Grid>
        );
    }


}
