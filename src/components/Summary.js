import React from 'react';
import { connect } from 'react-redux';
import { fetchAllTimesheets } from '../actions/index'
import Table from 'react-bootstrap/Table'

class Summary extends React.Component {
    componentDidMount() {
        this.props.fetchAllTimesheets();
    }

    renderTimesheetList() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>SSN</th>
                    <th>Visa Start Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.timesheets.map((timesheet, idx) => {
                        return ([
                            <tr key={idx}>
                            <td>{timesheet.employeeId}</td>
                            <td>{timesheet.firstName} </td>
                            <td>{timesheet.ssn}</td>
                            <td>{timesheet.startDate}</td>
                            </tr>
                        ]);
                    })}
                </tbody>
            </Table>
        );
    }

    render() {
        console.log(this.props.userId);
        return <div>ok</div>;
        // return <div>{this.renderTimesheetList()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { timesheets: state.timesheets };
};

export default connect(
    mapStateToProps, 
    { fetchAllTimesheets }
)(Summary);