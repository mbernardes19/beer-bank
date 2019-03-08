import React from 'react';
import Grid from '@material-ui/core/Grid';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import Slider from '@material-ui/lab/Slider';

const breakpointValues = {
    xs: 0,
    sm: 638,
    md: 768,
    lg: 992,
    xl: 1200,
  };
  const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });

export default class AdvSearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state={           
            gtAbv:null,
            ltAbv:null,
            gtIbu:null,
            ltIbu:null,
            gtEbc:null,
            ltEbc:null,
            brwBef:null,
            brwAft:null,

        }
    }

    async getAdvSearch(){
        const {gtAbv, ltAbv, gtIbu, ltIbu, gtEbc, ltEbc, brwBef, brwAft} = this.state;
        url = `https://api.punkapi.com/v2/beers?abv_gt=${gtAbv}&abv_lt=${ltAbv}&ibu_gt=${gtIbu}&ibu_lt=${ltIbu}&ebc_gt=${gtEbc}&ebc_lt=${ltEbc}&brewed_before=${brwBef}&brewed_after=${brwAft}`;
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }


    handleChangeGtAbv = (event, value) => {
        this.setState({gtAbv:value})
    }
    handleChangeLtAbv = (event, value) => {
        this.setState({ltAbv:value})
    }

    render(){
        return(
            <Grid  item xs={12}>
                <div style={{width:'100%', height:'50px', backgroundColor:'#dddddd', position:'relative',zIndex:5, margin:'0 auto'}}>
                <p>Max ABV:</p>
                <Slider
                    style={{padding:'0',position:'relative',zIndex:10}}
                    value={this.state.gtAbv}
                    min={0}
                    max={55}
                    step={1}
                    onChange={this.handleChangeGtAbv}
                />
                <p>{this.state.gtAbv}</p>
                </div>
                <div style={{width:'100%', height:'50px', backgroundColor:'#dddddd', position:'relative',zIndex:100, margin:'0 auto'}}>
                <p>Min ABV:</p>
                <Slider
                    style={{paddingLeft:'10px'}}
                    value={this.state.ltAbv}
                    min={0}
                    max={55}
                    step={1}
                    onChange={this.handleChangeLtAbv}
                />
                <p>{this.state.ltAbv}</p>
                </div>
            </Grid>
        );
    }


}
