import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './../public/style.css';
import Sticky from 'react-sticky-el';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchQuery:"",
            filtered:[]
        }
      
    }

    async getBeers(){
        let response = await fetch('https://api.punkapi.com/v2/beers');
        let data = await response.json();
        return data;
    }

    handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        this.setState({
            searchQuery: isCheckbox ?
            event.target.checked : event.target.value
        })}

    componentDidMount(){
        this.setState({
            filtered:this.props.items
        })
    }

    render(){
        const baseUrl = '/beer-bank';

        


        return(
                <Grid  item xs={12}>
                    <header>
                    <Sticky>
                        <nav>
                            <div id='navbar'>
                                
                                    
                                    <Link className='link' to={baseUrl+'/'}>HOME</Link>
                                    <Link className='link' to={baseUrl+'/favourite'}>FAVOURITE</Link>
                                
                            </div>
                        </nav>
                       
                    </Sticky>
                        <h1>The Beer Bank</h1>
                        <p style={{marginBottom:0, paddingBottom:20}}>Find your favorite beer here</p>
                    </header>
                    
                </Grid>
        );
    }


}

