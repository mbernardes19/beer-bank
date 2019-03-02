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
import InfiniteScroll from 'react-infinite-scroller';


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

        }
    }


    render(){
        return(
            <React.Fragment>
                <Grid className='grid' justify='center' alignContent='flex-start' container>
                    <Header/>

                    <BeerGrid/>
                </Grid>

                {console.log(this.state.fetchedBeers)}
            </React.Fragment>
        );
    }


}
