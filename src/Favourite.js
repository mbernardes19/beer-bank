import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import BeerCard from './BeerCard';
import FavouriteBeerGrid from './FavouriteBeerGrid';

const breakpointValues = {
    xs: 0,
    sm: 638,
    md: 768,
    lg: 992,
    xl: 1200,
  };
  const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });

export default class Favourite extends React.Component{
    constructor(props){
        super(props);
        this.state={           
            favBeers:[]
        }
    }
    
    componentDidMount(){
        this.setState({
            favBeers:this.props.favourites
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            favBeers:nextProps.favourites
        })
    }

    render(){
        let favBeers=[];
        if(this.state.favBeers){
            favBeers = this.state.favBeers.map((beer)=>{
                return (
                    <BeerCard id={beer.id} key={beer.id} tag={beer.tagline} name={beer.name} img={beer.image_url}/>
                );                
            });
        }
        return(
            <React.Fragment>
                <Grid justify='center' container>
                    <Header/>
    
                    {favBeers}
                    {console.log(this.state.favBeers)}
                </Grid>
            </React.Fragment>
        );
    }


}
