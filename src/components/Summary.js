import React from 'react';
import { connect } from 'react-redux';
import { fetchAllTimesheets } from '../actions/index'
import Table from 'react-bootstrap/Table'
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { fetchProfile } from '../actions/index'
import Timesheet from './Timesheet';
import { Tooltip } from '@material-ui/core';



class Summary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          isShown: false
        };
      }

    componentDidMount() {
        this.props.fetchAllTimesheets();
        this.props.fetchProfile();
    }

    optioncondition(status){
        console.log(status);
        if(status == "Approved"){
            return "View";
        }
        else{
            return "Edit";
        }
    }

   

    commentcondition(numOfFloatingDays, numOfVacationDays, numOfHolidays){
        // console.log(numOfFloatingDays, numOfVacationDays, numOfHolidays);
        let res = "";
        if(numOfFloatingDays == 1)
            res += "1 floating day required";
        else if(numOfFloatingDays > 1)
            res += numOfFloatingDays + " floating days required";
        
        if(res.length > 0){
            res +=", "
        }

        if(numOfVacationDays == 1)
            res += "1 vacation day required";
        else if(numOfVacationDays > 1)
            res += numOfVacationDays + " vacation days required";

        if(res.length > 0){
            res +=", "
        }

        if(numOfHolidays == 1)
            res += "1 holiday day was included";
        else if(numOfHolidays > 1)
            res += numOfHolidays + " vacation days were included";
        
        return res
        
    }
    
    

    renderTimesheetList() {
        
        
        
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>WeekEnding</th>
                    <th>Total Hours</th>
                    <th>Submission Status</th>
                    <th>Approval Status</th>
                    <th>Option</th>
                    <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.timesheets.map((timesheet, idx) => {
                        return ([
                            <tr key={idx}>
                            <td>{timesheet.weekending}</td>
                            <td>{timesheet.totalBillingHour} </td>
                            <td>{timesheet.submissionStatus}&nbsp;&nbsp;&nbsp;
                                <Tooltip title = "tip" arrow>
                                <img src = {process.env.PUBLIC_URL + 'tag.jpg'} width = {20} height = {20}/>
                                </Tooltip>
                                </td>
                            <td>{timesheet.approvalStatus}</td>
                            <td>
                            <button>{this.optioncondition(timesheet.approvalStatus)}</button>
                            </td>
                            <td>{this.commentcondition(timesheet.numOfFloatingDays, timesheet.numOfVacationDays, timesheet.numOfHolidays)}
                            &nbsp;&nbsp;&nbsp;{
                                (timesheet.numOfFloatingDays > 0 || timesheet.numOfVacationDays > 0)? 
                                <Tooltip title = "tip" arrow>
                                <img src = {process.env.PUBLIC_URL + 'tag.jpg'} width = {20} height = {20}/>
                                </Tooltip>: null
                            }
            
                            </td>
                            </tr>
                        ]);
                    })}
                </tbody>
            </Table>
        );
    }

    render() {
        
        console.log(this.props.timesheets);
        console.log(this.props.profile);
        return <div>{this.renderTimesheetList()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { timesheets: state.timesheets ,
            profile: state.profile};
};


export default connect(
    mapStateToProps, 
    { fetchAllTimesheets, fetchProfile }
    
)(Summary);