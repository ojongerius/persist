import React, {Component} from 'react';
import axios from 'axios';
import HeaderBar from './admin-components/header-bar/header-bar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getAllSchools,
    getNotifications,
    getAllStudents,
    getAllColleges,
    getAllCounselors
} from '../actions'
import NavigationMenu from './admin-components/navigation-menu';
// import ControlPanel from './admin-components/control-panel';
import ControlMenu from './admin-components/controls-menu';
import Footer from './admin-components/footer';
import '../../public/style/main2.scss';
import {MaterialUIWrapper} from './helpers';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        axios.all([
            this.props.getAllStudents(),
            this.props.getAllSchools(),
            this.props.getAllColleges(),
            this.props.getAllCounselors(),
            this.props.getNotifications(0, 5)
        ]).then((results) => {
            results.map((result) => {
                if (result && result.response && result.response.status === 401) {
                    window.location = '/logout';
                }
            });
        });
    }

    componentDidMount() {
        // triggering resize event
        const evt = document.createEvent("HTMLEvents");
        evt.initEvent('resize', true, false);
        window.dispatchEvent(evt);
    }

    render() {
        return (
            <div className='wrapper'>
                <HeaderBar />
                <NavigationMenu />
                <section className='content-wrapper'>
                    <MaterialUIWrapper>
                        { this.props.currentPage }
                    </MaterialUIWrapper>
                </section>
                <Footer />
                <ControlMenu />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getAllStudents,
        getAllColleges,
        getAllSchools,
        getAllCounselors,
        getNotifications
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Dashboard);
