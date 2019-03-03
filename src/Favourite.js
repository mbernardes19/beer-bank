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


    showFavorites = () =>{
        let favs = JSON.parse(sessionStorage.getItem('favorites'));
        console.log(favs)
        return favs.map((fav)=>
            <BeerCard id={fav.id} key={fav.id} tag={fav.tagline} name={fav.name} img={fav.img} description={fav.description} abv={fav.abv} ibu={fav.ibu} ebc={fav.ebc} foodPairing={fav.foodPairing} isFav={true} />
        )
    }

    render(){
        return(
            <React.Fragment>
                <Grid justify='center' container>
                    <Header/>
    
                    {this.showFavorites()};
                </Grid>
            </React.Fragment>
        );
    }


}
