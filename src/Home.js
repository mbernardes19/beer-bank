import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import BeerCard from './BeerCard';
import BeerGrid from './BeerGrid';

const breakpointValues = {
    xs: 0,
    sm: 638,
    md: 768,
    lg: 992,
    xl: 1200,
  };
  const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={           
            fetchedBeers:[],
            searchableBeers:[{
                id:'',
                name:'',
                tagline:'',
            }]
        }
    }
    

    async getBeers(){
        let response = await fetch('https://api.punkapi.com/v2/beers');
        let data = await response.json();
        return data;
    }

    async getBeerById(id){
        let response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
        let data = await response.json();
        return data
    }

    async getBeerImages(){
        let fetchedImages = [];
        let fetchedBeers = await this.getBeers();
        for(let i=0;i<fetchedBeers.length;i++){
            fetchedImages.push(fetchedBeers[i].image_url);
        }
        return fetchedImages; 
    }

    async getBeerNames(){
        let fetchedNames = [];
        let fetchedBeers = await this.getBeers();
        for(let i=0;i<fetchedBeers.length;i++){
            fetchedNames.push(fetchedBeers[i].name);
        }
        return fetchedNames; 
    }

    async componentDidMount(){
        this.setState({fetchedBeers: await this.getBeers()});
    }

    render(){
        return(
            <React.Fragment>
                {
                    this.state.fetchedBeers.map((beer)=>{
                        let beerArr = this.state.searchableBeers;
                        let newBeer = {
                                        id:beer.id,
                                        name:beer.name,
                                        tagline:beer.tagline
                                      };
                        beerArr.push(newBeer);                        
                        }
                    )
                }
                <Grid justify='center' container>
                    <Header/>
                    
                    <BeerGrid searchBeers={this.state.searchableBeers} beers={this.state.fetchedBeers}/>
  
                </Grid>

                {console.log(this.state.fetchedBeers)}
                {console.log(this.state.searchableBeers)}
            </React.Fragment>
        );
    }


}
