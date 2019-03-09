import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import './../public/style.css';
import BeerCard from './BeerCard';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const breakpointValues = {
    xs: 0,
    sm: 638,
    md: 768,
    lg: 992,
    xl: 1200,
  };
  const theme = createMuiTheme({
        breakpoints: { 
           values: breakpointValues
        },
        typography:{
            useNextVariants: true,
        },
    });

export default class Favourite extends React.Component{
    constructor(props){
        super(props);
        this.state={           
            favBeers:[]
        }
    }

    update = () => {
        this.forceUpdate();
    }

    showFavorites = () =>{
        let favs = JSON.parse(sessionStorage.getItem('favorites'));
        console.log(favs)
        return favs.map((fav)=>
            <BeerCard id={fav.id} key={fav.id} tag={fav.tagline} name={fav.name} img={fav.img} description={fav.description} abv={fav.abv} ibu={fav.ibu} ebc={fav.ebc} foodPairing={fav.foodPairing} isFav={true} updateFav={this.showFavorites} updateComponent={this.update} />
        )
    }

    render(){
        return(
            <React.Fragment>
                <MuiThemeProvider>
                <Grid justify='center' container>
                    <Header/>
                    {this.showFavorites()}
                </Grid>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }


}
