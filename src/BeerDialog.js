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
        }
    }

    

    render(){
        const {fullScreen} = this.props;
        return(
            <React.Fragment>            
            <MuiThemeProvider theme={theme}>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.props.onClose}   
                >
                    <DialogTitle>{this.props.name}</DialogTitle>
                
                </Dialog>
            </MuiThemeProvider>
            </React.Fragment>



        );
    }


}

