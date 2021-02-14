import React from 'react';
import { connect } from 'react-redux';
import { fetchProfiles } from '../actions/index'
import Table from 'react-bootstrap/Table'

class Summary extends React.Component {
    componentDidMount() {
        this.props.fetchProfiles();
    }

    renderProfileList() {
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
                    {this.props.profiles.map((profile, idx) => {
                        return ([
                            <tr key={idx}>
                            <td>{profile.employeeId}</td>
                            <td>{profile.firstName} </td>
                            <td>{profile.ssn}</td>
                            <td>{profile.startDate}</td>
                            </tr>
                        ]);
                    })}
                </tbody>
            </Table>
        );
    }

    render() {
        console.log(this.props.profiles);
        return <div>{this.renderProfileList()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { profiles: state.profiles };
};

export default connect(
    mapStateToProps, 
    { fetchProfiles }
)(Summary);