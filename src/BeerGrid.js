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
            filteredBeers:[],
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
        this.setState({filteredBeers: this.state.fetchedBeers});
     }
 

    async handleChange(e){
        let currentBeers = [];
        let newBeers = [];
        let getQueryBeers = [];
        let queryBeers = [];

        if(e.target.value !== ""){
            const query = e.target.value.toLowerCase();
            const url = `https://api.punkapi.com/v2/beers?beer_name=${query}`;
            currentBeers = this.state.fetchedBeers;
            getQueryBeers = await fetch(url);
            queryBeers = await getQueryBeers.json();
            newBeers = await queryBeers;
            /*newBeers = currentBeers.filter(beer => {
                const lcName = beer.name.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lcName.includes(filter)
             */   
        } else {
            newBeers = this.state.fetchedBeers;
        }
        this.setState({
            filteredBeers: newBeers
        });
        {console.log(this.state.filteredBeers)}

    }

     componentDidMount(){
        setTimeout(()=>{
            this.setState({filteredBeers: this.state.fetchedBeers});
        }, 5);
        
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
                        this.state.filteredBeers.map((beer)=>
                            <BeerCard id={beer.id} key={beer.id} tag={beer.tagline} name={beer.name} img={beer.image_url} description={beer.description} abv={beer.abv} ibu={beer.ibu} ebc={beer.ebc} foodPairing={beer.food_pairing} favs={this.state.favouriteBeers}/>
                        )
                    }
                    {console.log(`Filtered beers:`)}
                    {console.log(this.state.filteredBeers)}
                    {console.log(`Fetched beers:`)}
                    {console.log(this.state.fetchedBeers)}
                    

            </MuiThemeProvider>

            </React.Fragment>



        );
    }


}
