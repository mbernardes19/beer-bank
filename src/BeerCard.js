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
            fav:false
        }
    }

    handleMouseEnter = () => () =>{
        this.setState({elevation:10});
    }

    handleMouseLeave = () => () =>{
        this.setState({elevation:2});
    }

    handleChange = () => (event) =>{
        this.setState({fav:event.target.checked});
    }

    render(){
        const { elevation, fav } = this.state;
        return(
            <React.Fragment>
            
            <MuiThemeProvider theme={theme}>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper style={{position:'relative', zIndex:1}} onMouseEnter={this.handleMouseEnter()} onMouseLeave={this.handleMouseLeave()} id={this.props.id} elevation={this.state.elevation} className="beer-container">
                            <FormControlLabel
                                className='fav-btn'
                                control={
                                    <MuiThemeProvider theme={theme}>
                                        <Checkbox checked={fav} onChange={this.handleChange()} icon={<StarBorder/>} color='default' checkedIcon={<Star/>} value='checked'/>
                                    </MuiThemeProvider>
                                }
                            />
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

