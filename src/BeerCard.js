import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import BeerDialog from './BeerDialog';
import babelPolyfill from 'babel-polyfill';

//Custom breakpoints for Beer Cards
const breakpointValues = {
    xs: 0,
    sm: 638,
    md: 768,
    lg: 992,
    xl: 1200,
  };

  const theme = createMuiTheme({
    breakpoints: { values: breakpointValues },
    overrides:{
       MuiCheckbox:{
            checked:{
                color:'#FFA500', //Color of the checked Favorite Button
            }
       },
  },
  typography: {
      useNextVariants: true, //this sets Material UI Typography ready to change on next update
    },
  });


export default class BeerCard extends React.Component{
    constructor(props){
        super(props);
        this.state={           
            elevation:2,
            fav: false,
            open:false
        }
    }
    
    // 
    // ========== HANDLER FUNCTIONS ==========
    //

    handleMouseEnter = () => () =>{
        this.setState({elevation:10});
    }

    handleMouseLeave = () => () =>{
        this.setState({elevation:2});
    }

    handleFavoriteChange = (event) =>{
        this.setState({fav:event.target.checked});

        if(this.state.fav == false){
           this.insertInFavorites();
        }
        else {
           this.removeFromFavorites();
        }
    }

    handleClickOpenDialog = () => {
        this.setState({open:true});
    }
    
    handleCloseDialog = () => {
        this.setState({open:false});
    }

    // 
    // ========== OTHER FUNCTIONS ==========
    //

    checkIfFavoritesExist = () =>  {
        let favoritesArray = JSON.parse(sessionStorage.getItem('favorites'));
        if (favoritesArray === undefined || favoritesArray === null || favoritesArray.length === 0)
            return false;
        else
            return favoritesArray;
    }
        
    checkIfIsFavorite = (favoritesArray) => {
        if(favoritesArray == false)
            return false;
        else {
            let index = favoritesArray.findIndex(fav => fav.id === this.props.id);
            if(index > -1)
                return true;
            else
                return false;
        }
    }

    setAsFavorite = (fav) => {
        if(fav){
            sessionStorage.setItem('isFavorite', 'true')
            let isFavorite = Boolean(sessionStorage.getItem('isFavorite'));
            this.setState({fav:isFavorite});
        }
        else
            return
    }

    insertInFavorites = () => {
        let favoritesArray = JSON.parse(sessionStorage.getItem('favorites'));
        favoritesArray.push({
            id:this.props.id,
            name:this.props.name,
            img: this.props.img,
            tagline: this.props.tag,
            descripton: this.props.description,
            abv: this.props.abv,
            ibu: this.props.ibu,
            ebc: this.props.ebc,
            foodPairing: this.props.foodPairing,
            isFav: this.state.fav
        });
        sessionStorage.setItem('favorites',JSON.stringify(favoritesArray));
    }

    removeFromFavorites = () => {
        let favoritesArray = JSON.parse(sessionStorage.getItem('favorites'));
        let newFavoritesArray = favoritesArray.filter((fav)=>{
            return fav.id !== this.props.id
        });
            
        sessionStorage.setItem('favorites',JSON.stringify(newFavoritesArray));
        this.props.updateComponent();
    }

    // 
    // ========== LIFE CYCLE FUNCTIONS ==========
    //
    
    componentDidMount(){
        let favArr = this.checkIfFavoritesExist();
        let isFav = this.checkIfIsFavorite(favArr);
        isFav ? this.setAsFavorite(isFav) : this.setState({fav:false});
    }

    render(){
        return(
            <React.Fragment>
            
            <MuiThemeProvider theme={theme}>
                <BeerDialog onClose={this.handleCloseDialog} open={this.state.open} id={this.props.id} tag={this.props.tag} name={this.props.name} img={this.props.img} description={this.props.description} abv={this.props.abv} ibu={this.props.ibu} ebc={this.props.ebc} hops={this.props.hops} malt={this.props.malt} yeast={this.props.yeast} foodPairing={this.props.foodPairing}/>
                <Grid className='beercard' item xs={12} md={6} lg={4}>
                    <FormControlLabel className='fav-btn'
                                control={
                                    <MuiThemeProvider theme={theme}>
                                        <Checkbox checked={this.state.fav} onChange={this.handleFavoriteChange} icon={<StarBorder/>} color='default' checkedIcon={<Star/>} value='checked'/>
                                    </MuiThemeProvider>
                                }
                    />
                    <Paper className="beer-container" onClick={this.handleClickOpenDialog} onMouseEnter={this.handleMouseEnter()} onMouseLeave={this.handleMouseLeave()} id={this.props.id} elevation={this.state.elevation}>        
                        <img className="beer-img" src={this.props.img}></img>
                        <h1 className="beer-name">{this.props.name}</h1>
                        <p className="beer-tag">{this.props.tag}</p>
                    </Paper>
                </Grid>
            </MuiThemeProvider>

            </React.Fragment>
        );
    }


}

