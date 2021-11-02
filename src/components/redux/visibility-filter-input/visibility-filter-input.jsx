import React from 'react';
import {connect} from 'react-redux';

import Form from 'react-bootstrap/Form';

import './visibility-filter-input.css'

import {setFilter} from '../../../actions/actions';

function VisibilityFilterInput(props) {
    return <Form.Control className='form-input'
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder='Search Movies'
        />
}

export default connect(
    null,
    {setFilter}
)(VisibilityFilterInput);