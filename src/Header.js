import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import BeerCard from './BeerCard';
import Sticky from 'react-sticky-el';
import Fuse from 'fuse.js';



export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchQuery:"",
            filtered:[]
        }
      
    }

    async getBeers(){
        let response = await fetch('https://api.punkapi.com/v2/beers');
        let data = await response.json();
        return data;
    }

    handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        this.setState({
            searchQuery: isCheckbox ?
            event.target.checked : event.target.value
        })}
/*
    async search((str) => {
        let options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "name",
              "tagline",
              "description"
            ]
        });
        let beers = await this.getBeers();
        let fuse = new Fuse(beers,options);
        let result = fuse.search(str);
        this.setState({searchQuery:result});
        console.log(result);
    }
        */

    componentDidMount(){
        this.setState({
            filtered:this.props.items
        })
    }

    render(){
        
       
        


        return(
                <Grid  item xs={12}>
                    <header>
                    <Sticky>
                        <nav>
                            <div id='navbar'>
                                <Link className='link' to="/">HOME</Link>
                                <Link className='link' to="/favourite">FAVOURITE</Link>
                            </div>
                        </nav>
                       
                    </Sticky>
                        <h1>The Beer Bank</h1>
                        <p>Find your favorite beer here</p>
                        <input id='search-input' onChange={this.handleChange} value={this.state.searchQuery} type='text' placeholder='Search for beer name'></input>
                    </header>
                    
                </Grid>
        );
    }


}

