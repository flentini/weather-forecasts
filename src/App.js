import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Search from './components/Search';
import Grid from './components/Grid';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const fetchForecasts = (cityId) => {
    return fetch('forecast/' + cityId).then((response) => {
        return response.json();
    });
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list : []
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header city={this.state.city} country={this.state.country} />
                    <Search onUpdateSearch={this._updateSearch.bind(this)} />
                    <Grid list={this.state.list} />
                </div>
            </MuiThemeProvider>
        )
    }

    _updateSearch(value) {
        fetchForecasts(value.id).then((data) => {
            this.setState(data);
        });
    }
}

const Header = (props) => {
    const details = props.city ? `: ${props.city}, ${props.country}` : '';

    return (
        <div>
            <h1>5 days forecast {details}</h1>
        </div>
    )
}

export default App;
