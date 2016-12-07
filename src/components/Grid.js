import React, { Component } from 'react';
import Tile from './Tile';
import Subheader from 'material-ui/Subheader';
import { GridList } from 'material-ui/GridList';

class Grid extends Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.list).map((date) => {
                    return (
                        <div key={date}>
                            <GridList cols={8}>
                                <Subheader>{date}</Subheader>
                                {this.props.list[date].hours.map((til, index) => <Tile details={til} key={index} />)}
                            </GridList>
                        </div>
                        )
                })}
            </div>
        )
    }
}

export default Grid;
