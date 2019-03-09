import React from 'react';
import './../public/style.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const breakpointValues = {
    xs: 0,
    sm: 638,
    md: 768,
    lg: 992,
    xl: 1200,
  };

export default class BeerDialog extends React.Component{
    constructor(props){
        super(props);
        this.state={           
            open:false,
            fullScreen: false,
            relatedBeers: []
        }
    }

    isMobile = () =>{
        if(window.outerWidth <= breakpointValues.md){
            return true;
        }
        return false
    }
    
    componentDidMount(){
        
    }

    render(){

        // Load Food Pairing data
        let foodPairing='';
        if(this.props.foodPairing){
            foodPairing = this.props.foodPairing.map((food)=>{
                return (
                  <li key={food}>{food}</li>  
                );
            });
        }

        let relatedBeers=[];
        let checkBeers=[];
        if(this.props.related){
                checkBeers = this.props.related.filter((beer)=> {
                    if(beer.name === this.props.name)
                        return false
                    else
                        return true 
                });

                if(checkBeers.length > 3){
                    checkBeers.pop();
                }

                relatedBeers = checkBeers.map((beer)=>{
                        return (
                            <Grid key={beer.id} className='beercard' item xs={12} md={6} lg={4}>
                                <Paper style={{height:'220px'}} className="beer-container">
                                    <img style={{height:'100px'}} src={beer.image_url}/>
                                    <p style={{color:'rgb(141, 141, 141)',fontWeight:900}}>{beer.name}</p>
                                </Paper>
                            </Grid>
                          );
                    
                });
            }


       

        return(
            <React.Fragment>            
                
                <Dialog
                    fullScreen={this.isMobile()}
                    open={this.props.open}
                    onClose={this.props.onClose}   
                >
                    <DialogContent >
                        <div className='dialog-container'>
                            <CloseIcon style={{position:'absolute', color:'rgb(161, 161, 161)', right:0, top:0, margin:'10px'}} onClick={this.props.onClose}/>
                            <img className='dialog-img' src={this.props.img}/>
                            <div className='dialog-content'>
                                <h1 className='beer-name-dialog'>{this.props.name}</h1>
                                <p className='dialog-tag'>{this.props.tag}</p>
                                <p>
                                    <span><strong>IBU:</strong> {this.props.ibu} &nbsp;</span>
                                    <span><strong>ABV:</strong> {this.props.abv}% &nbsp;</span>
                                    <span><strong>EBC:</strong> {this.props.ebc} &nbsp;</span>
                                </p>
                                <p>
                                    {this.props.description}
                                </p>
                                <strong>Best served with:</strong>
                                <ul className='dialog-food'>
                                    {foodPairing}
                                </ul> 
                            </div>
                        </div>
                        <div className='related-dialog'>
                            <h2 className='subtitle-dialog'>
                                You might also like:
                            </h2>
                            <div>
                                <Grid container>
                                    {relatedBeers}
                                </Grid>
                            </div>
                        </div>
                    </DialogContent>                
                </Dialog>

            </React.Fragment>
        );
    }


}

