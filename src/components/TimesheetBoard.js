import React from 'react';
import { connect } from 'react-redux';
import { fetchAllTimesheets } from '../actions/index'

class TimesheetBoard extends React.Component {
    componentDidMount() {
        console.log(this.props.weekending);
        this.props.fetchAllTimesheets();
    }

    render() {
        // console.log(this.props.timesheets);
        return <div>{this.props.weekending}</div>;
    }

}

const mapStateToProps = (state) => {
    return { timesheets: state.timesheets };
};

export default connect(
    mapStateToProps, 
    { fetchAllTimesheets }
)(TimesheetBoard);