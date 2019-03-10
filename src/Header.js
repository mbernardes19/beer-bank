import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './../public/style.css';
import Sticky from 'react-sticky-el';

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const baseUrl = '/beer-bank';
        return(
            //
            //NÃO ESQUECER DE ADICIONAR O BASEURL
            //
                <Grid  item xs={12}>
                    <header>
                        <Sticky>
                            <nav>
                                <div id='navbar'>                                
                                    <Link className='link' to={baseUrl + '/'}>HOME</Link>
                                    <Link className='link' to={baseUrl + '/favourite'}>FAVOURITE</Link>
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

