import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

// sample data source
const dataSource = [
    {label: 'New York', id: '5128638'},
    {label: 'London', id: '2643743'},
    {label: 'San Francisco', id: '5391997'},
    {label: 'Beijing', id: '1816670'},
    {label: 'Panama City', id: '3703443'},
];

const dataSourceConfig = {
    text: 'label',
    value: 'id'
};

class Search extends Component {
    render() {
        return (
            <AutoComplete dataSource={dataSource}
                dataSourceConfig={dataSourceConfig}
                floatingLabelText={dataSource.map((item) => item.label).join(', ')}
                fullWidth={true} />
        )
    }
}

export default Search;
