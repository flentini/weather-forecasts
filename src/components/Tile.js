import React, { Component } from 'react';
import { GridTile } from 'material-ui/GridList';

class Tile extends Component {
    render() {
        return (
            <GridTile title={this.props.details.main}
                subtitle={`${this.props.details.date_txt.substr(11)} - ${this.props.details.temp} °C`}>
                <img src={this.props.details.image} alt={this.props.details.description} />
            </GridTile>
        );
    }
}

export default Tile;
