import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import BeerCard from './BeerCard';



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
            filteredBeers:[],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({
            filteredBeers:this.props.beers
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            filteredBeers:nextProps.beers
        })
    }

    handleChange(e){
        let currentBeers = [];
        let newBeers = [];

        if(e.target.value !== ""){
            currentBeers = this.props.beers;
            newBeers = currentBeers.filter(beer => {
                const lcName = beer.name.toLowerCase();
                const lcTagLine = beer.tagline.toLowerCase();
                const filter = e.target.value.toLowerCase();
                if(lcName.includes(filter) || lcTagLine.includes(filter))
                    return true
            });
        } else {
            newBeers = this.props.beers;
        }
        this.setState({
            filteredBeers: newBeers
        });
        {console.log(this.state.filteredBeers)}

    }

    render(){
        return(
            <React.Fragment>
            <MuiThemeProvider theme={theme}>
                <Grid item xs={12}>
                    <div style={{backgroundColor:'orange', paddingBottom:20}}>
                        <input id='search-input' type='text' onChange={this.handleChange} placeholder='Search for beer'/>
                    </div>
                </Grid>
                {
                    this.state.filteredBeers.map((beer)=>
                        <BeerCard id={beer.id} key={beer.id} tag={beer.tagline} name={beer.name} img={beer.image_url}/>
                    )
                }
            </MuiThemeProvider>

            </React.Fragment>



        );
    }


}
