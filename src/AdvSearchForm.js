import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {MuiThemeProvider, createMuiTheme, createBreakpoints} from '@material-ui/core/styles';
import './../public/style.css';
import Slider from '@material-ui/lab/Slider';
import {DatePicker} from 'material-ui-pickers';

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
            queryDateBef:'',
            queryDateAft:'',
        }
        this.handleBrwBefChange = this.handleBrwBefChange.bind(this);
        this.handleBrwAftChange = this.handleBrwAftChange.bind(this);
    }
    handleChangeLtIbu = (event, value) => {
        this.setState({ltIbu:value})
    }
    handleChangeGtIbu = (event, value) => {
        this.setState({gtIbu:value})
    }
    handleChangeGtAbv = (event, value) => {
        this.setState({gtAbv:value})
    }
    handleChangeLtAbv = (event, value) => {
        this.setState({ltAbv:value})
    }
    handleChangeGtEbc = (event, value) => {
        this.setState({gtEbc:value})
    }
    handleChangeLtEbc = (event, value) => {
        this.setState({ltEbc:value})
    }
    handleBrwBefChange(date){
        if(date===null){
            this.setState({brwBef:null});    
            this.setState({queryDateBef:null});    
            return
        }
        this.setState({brwBef:date});
        let month = date.getMonth()+1;
        let monthString = month.toString();
        let monthFormat = '';
        if(monthString.length < 2){
            monthFormat = `0${monthString}`;
        } else {
            monthFormat = monthString;
        }
        let yearFormat = date.getFullYear().toString();

        let inputValue = document.getElementById('brwBef').getAttribute('value');
        inputValue = `${monthFormat}-${yearFormat}`;
        console.log(inputValue);
        this.setState({queryDateBef:inputValue});
    }
    handleBrwAftChange(date){
        if(date===null){
            this.setState({brwAft:null});
            this.setState({queryDateAft:null});
            return
        }
        this.setState({brwAft:date});
        let month = date.getMonth()+1;
        let monthString = month.toString();
        let monthFormat = '';
        if(monthString.length < 2){
            monthFormat = `0${monthString}`;
        } else {
            monthFormat = monthString;
        }
        let yearFormat = date.getFullYear().toString();

        let inputValue = document.getElementById('brwAft').getAttribute('value');
        inputValue = `${monthFormat}-${yearFormat}`;
        console.log(inputValue);
        this.setState({queryDateAft:inputValue});
    }


    render(){
        return(
            <Grid  item xs={12}>   
                <div style={{width:'85%', height:'50px', backgroundColor:'#dddddd', position:'relative',zIndex:100, margin:'0 auto'}}>
                <p>Max IBU:</p>
                <Slider
                    style={{paddingLeft:'10px'}}
                    value={this.state.ltIbu}
                    min={0}
                    max={1157}
                    step={1}
                    onChange={this.handleChangeLtIbu}
                />
                
                <p>{this.state.ltIbu}</p>

                </div>

                <div style={{width:'85%', height:'50px', backgroundColor:'#dddddd', position:'relative',zIndex:100, margin:'0 auto'}}>
                <p>Min IBU:</p>
                <Slider
                    style={{paddingLeft:'10px'}}
                    value={this.state.gtIbu}
                    min={0}
                    max={1157}
                    step={1}
                    onChange={this.handleChangeGtIbu}
                />
                
                <p>{this.state.gtIbu}</p>
                </div>


                <div style={{width:'85%', height:'50px', backgroundColor:'#dddddd', position:'relative',zIndex:100, margin:'0 auto'}}>
                <p>Max ABV:</p>
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


                <div style={{width:'85%', height:'50px', backgroundColor:'#dddddd', position:'relative',zIndex:5, margin:'0 auto'}}>
                <p>Min ABV:</p>
                <Slider
                    style={{paddingLeft:'10px',position:'relative',zIndex:10}}
                    value={this.state.gtAbv}
                    min={0}
                    max={55}
                    step={1}
                    onChange={this.handleChangeGtAbv}
                />
                
                <p>{this.state.gtAbv}</p>

                </div>

                <div style={{width:'85%', height:'50px', backgroundColor:'#dddddd', position:'relative',zIndex:100, margin:'0 auto'}}>
                <p>Max EBC:</p>
                <Slider
                    style={{paddingLeft:'10px'}}
                    value={this.state.ltEbc}
                    min={0}
                    max={600}
                    step={1}
                    onChange={this.handleChangeLtEbc}
                />
                
                <p>{this.state.ltEbc}</p>
                
                </div>


                <div style={{width:'85%', height:'50px', backgroundColor:'#dddddd', position:'relative',zIndex:5, margin:'0 auto'}}>
                <p>Min EBC:</p>
                <Slider
                    style={{paddingLeft:'10px',position:'relative',zIndex:10}}
                    value={this.state.gtEbc}
                    min={0}
                    max={600}
                    step={1}
                    onChange={this.handleChangeGtEbc}
                />
                
                <p>{this.state.gtEbc}</p>

                </div>

                <div>
                    <DatePicker
                        openTo="year"
                        autoOk
                        clearable
                        views={['year', 'month']}
                        label="Brewed before"
                        minDate={new Date('2007-04-01')}
                        maxDate={new Date('2016-06-01')}
                        value={this.state.brwBef}
                        onChange={this.handleBrwBefChange}
                    />
                </div>
                <div>
                    <DatePicker
                        openTo="year"
                        autoOk
                        clearable
                        views={['year', 'month']}
                        label="Brewed after"
                        minDate={new Date('2007-04-01')}
                        maxDate={new Date('2016-06-01')}
                        value={this.state.brwAft}
                        onChange={this.handleBrwAftChange}
                    />
                </div>

        

              




                <form id='form' onSubmit={this.props.handleSubmit} action='https://api.punkapi.com/v2/beers?' method='GET'>
                <input type='hidden' name='ibu_lt' value={this.state.ltIbu}/>
                <input type='hidden' name='ibu_gt' value={this.state.gtIbu}/>
                <input type='hidden' name='abv_lt' value={this.state.ltAbv}/>
                <input type='hidden' name='abv_gt' value={this.state.gtAbv}/>
                <input type='hidden' name='ebc_lt' value={this.state.ltEbc}/>
                <input type='hidden' name='ebc_gt' value={this.state.gtEbc}/>
                <input id='brwBef' type='hidden' name='brewed_before' value={this.state.queryDateBef}/>
                <input id='brwAft' type='hidden' name='brewed_after' value={this.state.queryDateAft}/>
                <button type='submit'>Submit</button>
                </form>
            </Grid>
            
        );
    }


}
