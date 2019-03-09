import React from 'react';
import Grid from '@material-ui/core/Grid';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './../public/style.css';
import BeerCard from './BeerCard';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import babelPolyfill from 'babel-polyfill';
import AdvSearchForm from './AdvSearchForm';

const breakpointValues = {
    xs: 0,
    sm: 638,
    md: 768,
    lg: 992,
    xl: 1200,
  };

const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });

export default class BeerGrid extends React.Component{
    constructor(props){
        super(props);
        this.state={           
            fetchedBeers:[],
            favouriteBeers:[],
            per_page: 25,
            page: 1,
            totalPages: null,
            scrolling: false,
            loading:true,
            advSearch:true,
            error: false,
            loadMore: false,
            loadingAdvSearch: false,
            advSearchMode: false
        };
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // 
    // ========== INFINITE SCROLL FUNCTIONS ==========
    //

    async getBeers(){
        if(this.state.advSearchMode){
            return
        } else {
        const {per_page, page, fetchedBeers} = this.state;
        const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${per_page}`;
        try{
            let response = await fetch(url);
            let data = await response.json();

            this.setState({
                fetchedBeers:[...fetchedBeers, ...data],
                scrolling: false,
                totalPages: 10,
                loading:false
            })
            return this.state.fetchedBeers;
        }
        catch(err){
            this.setState({
                loading:false,
                error:true
            })
        }
        }
    }

    handleScroll = (e) => {
        if(this.state.advSearchMode){
            return
        } else {

        
        const {scrolling, totalPages, page} = this.state;
        if(scrolling) return;
        if(totalPages <= page) return;
        const lastBeerCard = document.querySelector(`.grid > .beercard:last-child`);
        const lastBeerCardOffset = lastBeerCard.offsetTop + lastBeerCard.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        let bottomOffset = 60
        if(pageOffset > lastBeerCardOffset - bottomOffset)
            this.loadMore()
            }
    }

    loadMore = () => {
        this.setState(prevState =>({
            page: prevState.page + 1,
            scrolling: true,
            loadMore: true,
        }), this.getBeers)
     }

    // 
    // ========== SEARCH BAR FUNCTION ==========
    //

    async handleSearchBarChange(e){
        let newBeers = [];

        if(e.target.value !== ""){
            const query = e.target.value.toLowerCase();
            const url = `https://api.punkapi.com/v2/beers?beer_name=${query}`;
            let response = await fetch(url);
            let data = await response.json();
            newBeers = await data;
        } else {
            let response = await fetch('https://api.punkapi.com/v2/beers');
            let data = await response.json();
            newBeers = await data;
        }
        this.setState({
            fetchedBeers: newBeers
        });
    }
    
    // 
    // ========== OTHER FUNCTIONS ==========
    //

    checkIfFavoritesExist = () =>  {
        let favoritesArray = JSON.parse(sessionStorage.getItem('favorites'));
        if (favoritesArray === undefined || favoritesArray === null || favoritesArray.length === 0){
            return false;
        }
        else{
            return true;
        }
    }

    createFavoritesArray = () => {
        let favArr = [];
        sessionStorage.setItem('favorites', JSON.stringify(favArr)); 
    }

    load = () => {
        while(this.state.loading){
          return(
            <div style={{color:'orange', marginTop:'50px'}}>
              <CircularProgress color='inherit'/>
            </div>
          );
        }
        if(this.state.error){
            return(
            <div style={{marginTop:'50px'}}>
                <p>    
                    Couldn't get beers ):
                </p>
                <p>
                    Please, check your internet connection
                </p>
            </div>
            );
        }
    }

    loadScroll = () => {
        while(this.state.loadMore){
            return(
                <div style={{color:'orange', marginTop:'50px'}}>
                  <CircularProgress color='inherit'/>
                </div>
            );
        }
    }

    loadAdvSearch = () => {
        while(this.state.loadingAdvSearch){
            return(
                <div style={{color:'orange', marginTop:'50px'}}>
                  <CircularProgress color='inherit'/>
                </div>
            );
        }
    }

    showAdvSearch = () => {
        this.setState({advSearch:!this.state.advSearch});
        this.setState({advSearchMode:!this.state.advSearchMode});
    }

    // 
    // ========== LIFE CYCLE FUNCTIONS ==========
    //

    componentDidMount(){
        this.getBeers();
        this.scrollListener = window.addEventListener('scroll', (e)=>{
            this.handleScroll(e)
        })

        let favArr = this.checkIfFavoritesExist();
        favArr ? true : this.createFavoritesArray();
    }

   async handleSubmit(e){
        e.preventDefault();
        let pairs = [];
        let form = document.getElementById('form');
        for(let i=0;i<form.elements.length;i++){
            let e = form.elements[i];
            console.log(e);
            console.log(e.name);
            console.log(e.value);
            if(e.value){
                if(e.value !== "0"){
                    pairs.push(encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value));
                }          
            }
                
        }
        let queryString = pairs.join('&');
        let fetchableUrl = form.getAttribute('action') + queryString;
        console.log(fetchableUrl);

        this.setState({loadingAdvSearch:true});
        let response = await fetch(fetchableUrl);
        let data = await response.json();
        this.setState({fetchedBeers:data});
        this.setState({loadingAdvSearch:false});

    }


    render(){
        return(
            <React.Fragment>

            <MuiThemeProvider theme={theme}>
                <Grid item xs={12}>
                    <div style={{backgroundColor:'orange', paddingBottom:40, position:'relative'}}>
                        <div className='search-container'>
                            <input id='search-input' type='text' onChange={this.handleSearchBarChange} placeholder='Search for beer name'/>
                            <a onClick={this.showAdvSearch} style={{cursor:'pointer'}} className='adv-search-link'>Advanced search</a>
                        </div>
                    </div>
                    <Hidden xsDown={this.state.advSearch} xsUp={this.state.advSearch}>
                        <AdvSearchForm fetchedBeers={this.state.fetchedBeers} handleSubmit={this.handleSubmit}/>
                        <div style={{display:'block',margin:'0 auto'}}>
                        {
                            this.loadAdvSearch()
                        }
                        </div>
                    </Hidden>
                </Grid>

                    {
                        this.load()
                    } 

                    {
                        this.state.fetchedBeers.map((beer)=>
                            <BeerCard id={beer.id} key={beer.id} tag={beer.tagline} name={beer.name} img={beer.image_url} description={beer.description} abv={beer.abv} ibu={beer.ibu} ebc={beer.ebc} foodPairing={beer.food_pairing} hops={beer.ingredients.hops} yeast={beer.ingredients.yeast} malt={beer.ingredients.malt} favs={this.state.favouriteBeers}/>
                        )
                    }
                    {console.log(this.state.fetchedBeers)}
            </MuiThemeProvider>

            </React.Fragment>
        );
    }


}
