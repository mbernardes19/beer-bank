import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './../public/style.css';
import Slider from '@material-ui/lab/Slider';
import {DatePicker} from 'material-ui-pickers';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';


const breakpointValues = {
    xs: 0,
    sm: 638,
    md: 768,
    lg: 992,
    xl: 1200,
  };
  const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#FFA82A',
                light: '#ffb447',
                dark: '#db8f20',
            },
            secondary: {
                main: '#FFA82A'
            },
        },
    });

  const styles = {
      thumb:{
        backgroundColor:'orange'
    },
    track:{
        backgroundColor:'orange',
        color:'orange'
    }
  }

class AdvSearchForm extends React.Component{
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

    clearFields = () => {
        this.setState({
            gtAbv:null,ltAbv:null,gtIbu:null,ltIbu:null,gtEbc:null,ltEbc:null,brwBef:null,brwAft:null,queryDateBef:'',queryDateAft:''
        })
                
    }


    render(){
        const {classes} = this.props;
        return(
            <MuiThemeProvider theme={theme}>
            <Grid  item xs={12}>   
                <div className='slider-field'>
                <p className='slider-label'>Max IBU: {this.state.ltIbu}</p>
                <Slider
                    className='slider'
                    classes={{thumb:classes.thumb,track:classes.track}}
                    value={this.state.ltIbu}
                    min={0}
                    max={1157}
                    step={1}
                    onChange={this.handleChangeLtIbu}
                />
                </div>

                <div className='slider-field'>
                <p className='slider-label'>Min IBU: {this.state.gtIbu}</p>
                <Slider
                    className='slider'
                    classes={{thumb:classes.thumb,track:classes.track}}
                    value={this.state.gtIbu}
                    min={0}
                    max={1157}
                    step={1}
                    onChange={this.handleChangeGtIbu}
                />
                </div>


                <div className='slider-field'>
                <p className='slider-label'>Max ABV: {this.state.ltAbv}%</p>
                <Slider
                    className='slider'
                    classes={{thumb:classes.thumb,track:classes.track}}
                    value={this.state.ltAbv}
                    min={0}
                    max={55}
                    step={1}
                    onChange={this.handleChangeLtAbv}
                />
                </div>


                <div className='slider-field'>
                <p className='slider-label'>Min ABV: {this.state.gtAbv}%</p>
                <Slider
                    className='slider'
                    classes={{thumb:classes.thumb,track:classes.track}}
                    value={this.state.gtAbv}
                    min={0}
                    max={55}
                    step={1}
                    onChange={this.handleChangeGtAbv}
                />
                </div>

                <div className='slider-field'>
                <p className='slider-label'>Max EBC: {this.state.ltEbc}</p>
                <Slider
                    className='slider'
                    classes={{thumb:classes.thumb,track:classes.track}}
                    value={this.state.ltEbc}
                    min={0}
                    max={600}
                    step={1}
                    onChange={this.handleChangeLtEbc}
                />
                </div>


                <div className='slider-field'>
                <p className='slider-label'>Min EBC: {this.state.gtEbc}</p>
                <Slider
                    className='slider'
                    classes={{thumb:classes.thumb,track:classes.track}}
                    value={this.state.gtEbc}
                    min={0}
                    max={600}
                    step={1}
                    onChange={this.handleChangeGtEbc}
                />
                </div>

                <div className='slider-field'>
                    <div style={{positon:'relative'}}>
                    <DatePicker
                        className='date-picker'
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
                </div>
                <div className='slider-field'>
                    <div style={{positon:'relative'}}>
                    <DatePicker
                        className='date-picker'
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
                    <div style={{display:'flex',justifyContent:'center', margin: '0 auto'}}>
                        <Button variant='contained' style={{display:'inline-block',marginRight:'20px'}} type='submit'>Submit</Button>
                        <Button variant='contained' style={{display:'inline-block'}} onClick={this.clearFields}>Reset</Button>
                    </div>
                </form>
            </Grid>
            </MuiThemeProvider>
            
        );
    }


}

export default withStyles(styles)(AdvSearchForm);