import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './../public/style.css';
import BeerGrid from './BeerGrid';


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
    }


    render(){
        return(
            <React.Fragment>
                <MuiThemeProvider theme={theme}>
                    <Grid className='grid' justify='center' alignContent='flex-start' container>
                        <Header/>
                        <BeerGrid/>
                    </Grid>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }


}
