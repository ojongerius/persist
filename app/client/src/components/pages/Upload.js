import React from 'react';
import * as uploadFile from '../../actions/uploadFile';
import {connect} from 'react-redux';
import {FormGroup, ControlLabel, FormControl, Button, Input, InputGroup} from 'react-bootstrap';
import {Spinner} from '../helpers';
import Content from '../helpers/content';
import DropZoneUpload from '../helpers/dropzoneUpload';
import Paginate from '../uploadUI/Paginate';
import {SelectField, MenuItem} from 'material-ui';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosen: false,
            url: null,
            name: null
        };

    }

    chooseData(event, index, value) {
        this.setState({
            name: event.target.innerText,
            chosen: true,
            url: value
        });
    }

    getUrl(fileTypes, name) {
        return fileTypes.find(fileType => fileType.name === name).url;
    }

    render() {
        const {spinner} = this.props;
        const fileTypes = [
            {
                name: 'Student Data',
                url: '/upload/studentData'
            },
            {
                name: 'College Data',
                url: '/upload/collegeData'
            },
            {
                name: 'NSC Term Records',
                url: '/upload/termData'
            },
            {
                name: 'College Graduation Records',
                url: '/upload/collegeGraduation'
            },
            {
                name: 'College Application Data',
                url: '/upload/applicationData'
            }
        ];

        var optionsHTML = fileTypes.map((type, i) => {
            return (
                <MenuItem key={ i }
                          name={ type.name }
                          value={ this.getUrl(fileTypes, type.name) }
                          primaryText={ type.name }/>
            );
        });

        return (
            <Content title='Upload'>
                <Spinner/>
                <p>
                    Which data would you like to upload?
                </p>
                <div>
                    <SelectField onChange={ this.chooseData.bind(this) } hintText='Select Data'
                                 value={ this.state.url }>
                        { optionsHTML }
                    </SelectField>
                </div>
                { this.state.chosen ? <DropZoneUpload url={ this.state.url }/> : null }
                <Paginate />
            </Content>
        );
    }
}

const mapStateToProps = (state) => ({
    spinner: state.spinner
});

export default connect(mapStateToProps)(Upload);
