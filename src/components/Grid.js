import React, { Component } from 'react';
import Tile from './Tile';
import { GridList } from 'material-ui/GridList';

class Grid extends Component {
    render() {
        return (
            <GridList cols={5}>
                {this.props.list.map((til, index) => <Tile details={til} key={index} />)}
            </GridList>
        )
    }
}

export default Grid;
