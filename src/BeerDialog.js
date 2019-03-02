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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CloseIcon from '@material-ui/icons/Close';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

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


export default class BeerDialog extends React.Component{
    constructor(props){
        super(props);
        this.state={           
            open:false,
            fullScreen: false
        }
    }

    isMobile(){
        if(window.outerWidth <= breakpointValues.md){
            return true;
        }
        return false
    } 

    render(){
        let foodPairing='';
        if(this.props.foodPairing){
            foodPairing = this.props.foodPairing.map((food)=>{
                return (
                  <li key={food}>{food}</li>  
                );
            });
        }

        return(
            <React.Fragment>            
            <MuiThemeProvider theme={theme}>
                <Dialog
                    fullScreen={this.isMobile()}
                    open={this.props.open}
                    onClose={this.props.onClose}   
                >
                    <DialogContent className='dialog-container'>
                            <CloseIcon style={{position:'absolute', right:0, top:0, margin:'5px'}} onClick={this.props.onClose}/>
                            <img className='dialog-img' src={this.props.img}/>
                        <div className='dialog-content'>
                        <h1 className='beer-name-dialog'>{this.props.name}</h1>
                        <p>{this.props.tag}</p>
                        <p>
                            <span><strong>IBU:</strong> {this.props.ibu} &nbsp;</span>
                            <span><strong>ABV:</strong> {this.props.abv}% &nbsp;</span>
                            <span><strong>EBC:</strong> {this.props.ebc} &nbsp;</span>
                        </p>
                        <p>
                            {this.props.description}
                        </p>
                        <p>
                           <strong>Best served with:</strong>
                        </p>
                           <ul>
                            {foodPairing}
                            </ul> 
                        <h4 className='subtitle-dialog'>
                            You might also like:
                        </h4>
                        </div>
                    </DialogContent>                
                </Dialog>
            </MuiThemeProvider>
            </React.Fragment>



        );
    }


}

