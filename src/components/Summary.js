import React from 'react';
import { connect } from 'react-redux';
import { fetchAllTimesheets } from '../actions/index'
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { fetchProfile } from '../actions/index'
import Timesheet from './Timesheet';
import { Tooltip } from '@material-ui/core';
import { Container, Button, Table } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
  } from "@material-ui/core/styles";

  const BlueOnGreenTooltip = withStyles({
    tooltip: {
      fontSize: 15,
      backgroundColor: "darkgreen"
    }
  })(Tooltip);

class Summary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          range: 5
        };
        this.ShowMore = this.ShowMore.bind(this)
      }

    componentDidMount() {
        this.props.fetchAllTimesheets(this.props.userId);
        this.props.fetchProfile(this.props.userId);
    }

    optioncondition(status){
        if(status == "Approved"){
            return "View";
        }
        else{
            return "Edit";
        }
    }

   

    commentcondition(numOfFloatingDays, numOfVacationDays, numOfHolidays){
        let res = "";
        if(numOfFloatingDays == 1)
            res += "1 floating day required";
        else if(numOfFloatingDays > 1)
            res += numOfFloatingDays + " floating days required";
        
        

        if(numOfVacationDays == 1){
            if(res.length > 0){
                res +=", "
            }
            res += "1 vacation day required";
        }
        
        else if(numOfVacationDays > 1){
            if(res.length > 0){
                res +=", "
            }
            res += numOfVacationDays + " vacation days required";
        }
            


        if(numOfHolidays == 1){
            if(res.length > 0){
                res +=", "
            }
            res += "1 holiday day was included";
        }
            
        else if(numOfHolidays > 1){
            if(res.length > 0){
                res +=", "
            }
            res += numOfHolidays + " vacation days were included";
        }
            
        
        return res
        
    }
    
    ShowMore(){
        this.setState((state) => {
            // Important: read `state` instead of `this.state` when updating.
            return {range: state.range + 5}
          });
    }

    SubmissionTag(timesheet){
        if(timesheet.approvalStatus == "N/A"){
            return "Items due: Proof of Approved TimeSheet"
        }
        else if(timesheet.approvalStatus == "Not Approved"){
            return "Approval denied by Admin, please contact your HR manager"
        }
    }

    CommentTag(timesheet){
        let year = timesheet.weekending.substring(0,4);
        let res = ""
        let floatingdays = ""
        let vacationdays = ""
        if( typeof this.props.profile.remainDays != 'undefined'){
            floatingdays = this.props.profile.remainDays.remainingFloadingDays - timesheet.numOfFloatingDays;
            vacationdays = this.props.profile.remainDays.remainingVacationDays - timesheet.numOfVacationDays;
        }
        
        
        if(timesheet.numOfFloatingDays > 0){
            res+= "Total floating days left in " + year + " : " + floatingdays + " days"
    
        }
        
        if(timesheet.numOfVacationDays > 0){
            if(res.length > 0){
                res += ", "
            }
            res += "Total vacation days left in " + year + " : " + vacationdays + " days"
        }
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
                        if(idx < this.state.range)
                            return (    
                                [
                                <tr key={idx}>
                                <td>{timesheet.weekending}</td>
                                <td>{timesheet.totalBillingHour} </td>
                                <td>{timesheet.submissionStatus}&nbsp;&nbsp;&nbsp;
                                {
                                    (timesheet.submissionStatus == "Incomplete" && timesheet.approvalStatus != "Approved")? 
                                    <Tooltip title = {this.SubmissionTag(timesheet)} arrow>
                                    <img src = {process.env.PUBLIC_URL + 'tag.jpg'} width = {20} height = {20}/>
                                    </Tooltip>:null
                                }
                                   
                                    </td>
                                <td>{timesheet.approvalStatus}</td>
                                <td>
                                    <Link to={"/timesheet/" + timesheet.weekending}>{this.optioncondition(timesheet.approvalStatus)}</Link>
                                </td>
                                <td>{this.commentcondition(timesheet.numOfFloatingDays, timesheet.numOfVacationDays, timesheet.numOfHolidays)}
                                &nbsp;&nbsp;&nbsp;{
                                    (timesheet.numOfFloatingDays > 0 || timesheet.numOfVacationDays > 0)? 
                                    <BlueOnGreenTooltip title = {this.CommentTag(timesheet)} arrow >
                                    <img src = {process.env.PUBLIC_URL + 'tag.jpg'} width = {20} height = {20}/>
                                    </BlueOnGreenTooltip>: null
                                }
                
                                </td>
                                </tr>
                            ]);
                        else
                            return null;
                    })}
                </tbody>
            </Table>
        );
    }

    render() {
        return (
            <div>
                <Container align ="center">
                    {this.renderTimesheetList()}
                    <Button variant="info" onClick = {this.ShowMore} center>Show More</Button>
                </Container>
            </div>);
    }

}



const mapStateToProps = (state) => {
    return { timesheets: state.timesheets ,
            profile: state.profile};
};


export default connect(
    mapStateToProps, 
    {fetchAllTimesheets,
        fetchProfile}
    
)(Summary);