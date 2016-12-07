import React, { Component } from 'react';
import { GridTile } from 'material-ui/GridList';

class Tile extends Component {
    render() {
        return (
            <GridTile title={this.props.details.main}>
                <img src={this.props.details.image} />
            </GridTile>
        );
    }
}

export default Tile;
