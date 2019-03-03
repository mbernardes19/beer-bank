import React from 'react';
import ReactDOM from 'react-dom';
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
                color:'#FFA500',
            }
       },
  },
  typography: {
      useNextVariants: true,
    },
  });


export default class BeerCard extends React.Component{
    constructor(props){
        super(props);
        this.state={           
            elevation:2,
            favHome: Boolean(sessionStorage.getItem('favHome')),
            fav:this.props.isFav || false,
            open:false
        }
    }

    componentDidMount(){
        let favoritesArray = JSON.parse(sessionStorage.getItem('favorites'));
        if(favoritesArray === undefined || favoritesArray === null || favoritesArray.length === 0){
            console.log('oi!')
            return              
        }
        else{
        let favorites = JSON.parse(sessionStorage.getItem('favorites'));
        let index = favorites.findIndex(fav => fav.id === this.props.id);
        if(index > -1){
            sessionStorage.setItem('favHome', 'true')
            let favHome = Boolean(sessionStorage.getItem('favHome'));
            this.setState({fav:favHome});
        }
    }
        
    }
    
    handleMouseEnter = () => () =>{
        this.setState({elevation:10});
    }

    handleMouseLeave = () => () =>{
        this.setState({elevation:2});
    }

    handleChange = (event) =>{
        this.setState({fav:event.target.checked});
        if(this.state.fav == false){
            let favArr = JSON.parse(sessionStorage.getItem('favorites'));
            favArr.push({
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
            let favHome = sessionStorage.setItem('favHome','true');
            this.setState({favHome:favHome});
            console.log(favArr);
            sessionStorage.setItem('favorites',JSON.stringify(favArr));
            console.log(sessionStorage.getItem('favorites'));
            console.log(JSON.parse(sessionStorage.getItem('favorites')));
        }
        else {
            let index = JSON.parse(sessionStorage.getItem('favorites')).findIndex(fav => fav.id === this.props.id);
            let newArr = JSON.parse(sessionStorage.getItem('favorites')).filter((fav)=>{
               return fav.id !== this.props.id
            });
            
            sessionStorage.setItem('favorites',JSON.stringify(newArr));
            console.log(JSON.parse(sessionStorage.getItem('favorites')));
            this.props.updateComponent();
        }
        
        
    }

    handleClickOpen = () => {
        this.setState({open:true});
    }
    
    handleClose = () => {
        this.setState({open:false});
    }

    
    render(){
        return(
            <React.Fragment>
            
            <MuiThemeProvider theme={theme}>
                <BeerDialog onClose={this.handleClose} open={this.state.open} id={this.props.id} tag={this.props.tag} name={this.props.name} img={this.props.img} description={this.props.description} abv={this.props.abv} ibu={this.props.ibu} ebc={this.props.ebc} foodPairing={this.props.foodPairing}/>
                <Grid className='beercard' item xs={12} md={6} lg={4}>
                    <FormControlLabel className='fav-btn'
                                control={
                                    <MuiThemeProvider theme={theme}>
                                        <Checkbox checked={this.state.fav} onChange={this.handleChange} icon={<StarBorder/>} color='default' checkedIcon={<Star/>} value='checked'/>
                                    </MuiThemeProvider>
                                }
                    />
                    <Paper onClick={this.handleClickOpen} style={{position:'relative', zIndex:0, padding:'20px', height:'350px'}} onMouseEnter={this.handleMouseEnter()} onMouseLeave={this.handleMouseLeave()} id={this.props.id} elevation={this.state.elevation} className="beer-container">
                            
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

