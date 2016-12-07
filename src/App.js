import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import Tile from './components/Tile';
import Search from './components/Search';

const fetchForecasts = (cityId) => {
    return fetch(cityId).then((response) => {
        return response.json();
    });
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Search />
            </MuiThemeProvider>
        )
    }
}

export default App;
