import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import BeerCard from './BeerCard';
import Favourite from './Favourite';
import Hidden from '@material-ui/core/Hidden';
import InfiniteScroll from 'react-infinite-scroller';

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
            favouriteBeers:[{
                id:'',
                name:'',
                img:'',
                tagline:'',
            }],
            per_page: 25,
            page: 1,
            totalPages: null,
            scrolling: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        this.getBeers();
        this.scrollListener = window.addEventListener('scroll', (e)=>{
            this.handleScroll(e)
        })
    }

    handleScroll = (e) => {
        const {scrolling, totalPages, page} = this.state;
        if(scrolling) return;
        if(totalPages <= page) return;
        const lastBeerCard = document.querySelector(`.grid > .beercard:last-child`);
        console.log(lastBeerCard);
        const lastBeerCardOffset = lastBeerCard.offsetTop + lastBeerCard.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        let bottomOffset = 60
        if(pageOffset > lastBeerCardOffset - bottomOffset)
            this.loadMore()
    }

    async getBeers(){
        const {per_page, page, fetchedBeers} = this.state;
        const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${per_page}`;
        let response = await fetch(url);
        let data = await response.json();
        this.setState({
            fetchedBeers:[...fetchedBeers, ...data],
            scrolling: false,
            totalPages: 10
        })
        return this.state.fetchedBeers;
    }

    loadMore = () =>{
        this.setState(prevState =>({
            page: prevState.page + 1,
            scrolling: true,
        }), this.getBeers)
     }
 

    async handleChange(e){
        let currentBeers = [];
        let newBeers = [];
        let fetchQueryBeers = [];
        let queryBeers = [];

        if(e.target.value !== ""){
            const query = e.target.value.toLowerCase();
            const url = `https://api.punkapi.com/v2/beers?beer_name=${query}`;
            currentBeers = this.state.fetchedBeers;
            fetchQueryBeers = await fetch(url);
            queryBeers = await fetchQueryBeers.json();
            newBeers = await queryBeers;
        } else {
            fetchQueryBeers = await fetch('https://api.punkapi.com/v2/beers');
            queryBeers = await fetchQueryBeers.json();
            newBeers = await queryBeers;
        }
        this.setState({
            fetchedBeers: newBeers
        });
        {console.log(this.state.fetchedBeers)}

    }

    render(){
        const loader = <p>Loading...</p>
        return(
            <React.Fragment>
            <MuiThemeProvider theme={theme}>
                <Grid item xs={12}>
                    <div style={{backgroundColor:'orange', paddingBottom:20}}>
                        <input id='search-input' type='text' onChange={this.handleChange} placeholder='Search for beer name'/>
                    </div>
                </Grid>
                
                    {
                        this.state.fetchedBeers.map((beer)=>
                            <BeerCard id={beer.id} key={beer.id} tag={beer.tagline} name={beer.name} img={beer.image_url} description={beer.description} abv={beer.abv} ibu={beer.ibu} ebc={beer.ebc} foodPairing={beer.food_pairing} favs={this.state.favouriteBeers}/>
                        )
                    }
                    {console.log(`Fetched beers:`)}
                    {console.log(this.state.fetchedBeers)}
                    

            </MuiThemeProvider>

            </React.Fragment>



        );
    }


}
