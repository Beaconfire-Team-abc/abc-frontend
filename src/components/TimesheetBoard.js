import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { Tooltip } from '@material-ui/core';
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

export default class TimesheetBoard extends React.Component {
    constructor() {
        super();
        this.state = {timesheet: '', remainDays: ''};
    }

    componentDidMount() {
        // console.log(this.props.weekendingParam);
        if (typeof this.props.weekendingParam !== 'undefined') {
            this.loadData(this.props.weekendingParam);
        } else {
            this.loadData(this.props.weekending);
        }
    }

    loadData(weekend) {
        axios.get('/api/employee/timesheet/' + this.props.userId +'/weekending?weekend=' + weekend)
            .then(response => {
                this.setState({
                    timesheet: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('/api/profile/'+ this.props.userId)
            .then(response => {
                // console.log(response.data);
                this.setState({
                    remainDays: response.data.person.remainDays
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps) {
        // If it's a new weekending, load data again
        if (this.props.weekending !== prevProps.weekending){
            this.loadData(this.props.weekending);
        }
      }

    handleStartTimeChange(event, idx) {
        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet);  // creating copy of state variable
            timesheet.days[idx].startTime = event.target.value;                
            return { timesheet };                                 
          })
    }

    handleEndTimeChange(event, idx) {
        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet);  
            timesheet.days[idx].endTime = event.target.value;                                  
            return { timesheet };                                 
          })
    }

    handleTotalHoursChange(event, idx) {
        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet); 
            timesheet.days[idx].totalHours = event.target.value; 
            timesheet.totalBillingHour = this.computeTotalBillingHours(timesheet.days); 
            timesheet.totalCompensatedHour = this.computeTotalCompensatedHours(timesheet.totalBillingHour, timesheet.days);  
            return { timesheet };  
          })
    }

    handleIsFloatingDayChange(event, idx) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if (value && this.state.remainDays.remainingFloadingDays == 0) {
            alert("You used up all floating days");
            return;
        }
        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet);  
            let remainDays = Object.assign({}, prevState.remainDays);  
            timesheet.days[idx].isFloatingDay = value; 
            timesheet.days[idx].endTime = "N/A";
            timesheet.days[idx].startTime = "N/A";
            timesheet.days[idx].totalHours = "0";
            timesheet.totalBillingHour = this.computeTotalBillingHours(timesheet.days);
            timesheet.totalCompensatedHour = this.computeTotalCompensatedHours(timesheet.totalBillingHour, timesheet.days);
            timesheet.numOfFloatingDays = timesheet.numOfFloatingDays + (value? 1: -1);
            remainDays.remainingFloadingDays = remainDays.remainingFloadingDays + (value? -1: 1);
            return { timesheet: timesheet, remainDays: remainDays };                                 
          })
    }

    handleisVacationDayChange(event, idx) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if (value && this.state.remainDays.remainingVacationDays == 0) {
            alert("You used up all vacation days");
            return;
        }
        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet);  
            let remainDays = Object.assign({}, prevState.remainDays);  
            timesheet.days[idx].isVacationDay = value; 
            timesheet.days[idx].endTime = "N/A";
            timesheet.days[idx].startTime = "N/A";
            timesheet.days[idx].totalHours = "0";
            timesheet.totalBillingHour = this.computeTotalBillingHours(timesheet.days);
            timesheet.totalCompensatedHour = this.computeTotalCompensatedHours(timesheet.totalBillingHour, timesheet.days);
            timesheet.numOfVacationDays = timesheet.numOfVacationDays + (value? 1: -1);
            remainDays.remainingVacationDays = remainDays.remainingVacationDays + (value? -1: 1);
            return { timesheet: timesheet, remainDays: remainDays };                                 
          })
    }

    handleisHolidayChange(event, idx) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet);  
            timesheet.days[idx].isHoliday = value; 
            timesheet.days[idx].endTime = "N/A";
            timesheet.days[idx].startTime = "N/A";
            timesheet.days[idx].totalHours = "0";
            timesheet.totalBillingHour = this.computeTotalBillingHours(timesheet.days);
            timesheet.totalCompensatedHour = this.computeTotalCompensatedHours(timesheet.totalBillingHour, timesheet.days);
            timesheet.numOfHolidays = timesheet.numOfHolidays + (value? 1: -1);
            return { timesheet };                                 
          })
    }

    handleSubmissionStatus = event => {
        var status = event.target.value;
        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet);  
            timesheet.submissionStatus = (status === "Approved Timesheet")? "Complete": "Incomplete";
            return {timesheet} ;                                 
        });
    }

    computeTotalBillingHours(days) {
        var totalBillingHour = 0;
        for(let i = 0; i < days.length; i++){
            totalBillingHour = totalBillingHour + parseInt(days[i].totalHours);
        }
        return totalBillingHour;
    }

    computeTotalCompensatedHours(totalBillingHour, days){
        var totalCompensatedHour = parseInt(totalBillingHour);
        for(let i = 0; i < days.length; i++){
            if(days[i].isFloatingDay || days[i].isHoliday || days[i].isVacationDay){
                totalCompensatedHour = totalCompensatedHour + 8;
            };
        }
        return totalCompensatedHour;
    }

    handleSubmit = event => {
        console.log(this.state.timesheet);
        event.preventDefault();
        axios.post('/api/employee/timesheet/save', this.state.timesheet)
          .then(res => {
            console.log(res.status);
          })
        axios.post('/api/employee/profile/remaindays/update/' + this.props.userId, this.state.remainDays)
          .then(res => {
            console.log(res.status);
          })
        alert("Timesheet Saved");
    }

    onClickSetDefault = event => {
        event.preventDefault();
        axios.post('/api/employee/timesheet/defaulttimesheet/save', this.state.timesheet)
        .then(res => {
        console.log(res);
        });
        alert("Set To Default");
    }

    

    render() {
        const hoursOptions = [];
        for(let i = 0; i < 25; i++){
            hoursOptions.push(<option key = {i} value={i}>{i}</option>)
        }
        const timeOptions = [];
        timeOptions.push(<option key = 'N/A' value= 'N/A' >N/A</option>)
        for(let j = 0; j < 12; j++){
            const time = j + ":00 A.M.";
            timeOptions.push(<option key={time} value= {time} >{time}</option>)
        }
        for(let j = 0; j < 12; j++){
            const time = j + ":00 P.M.";
            timeOptions.push(<option key={time} value= {time} >{time}</option>)
        }

        return (
            <div>
                {
                    this.state.timesheet ?
                    <div>        
                     <form>
                        <div className="row">
                            <strong className="col-sm">Weekending Day: {this.state.timesheet.weekending}</strong>
                            <strong className="col-sm">Total Billing Hours: {this.state.timesheet.totalBillingHour}</strong>
                            <strong className="col-sm">Total Compensated Hours: {this.state.timesheet.totalCompensatedHour}</strong>
                            <input type="submit" value="Set Default" onClick={this.onClickSetDefault}/>&nbsp;
                            <BlueOnGreenTooltip title = "Save daily hours as default; future weekly timesheet will show same hours." arrow>
                                    <img src = {window.location.origin + '/tag.jpg'} width = {20} height = {20}/>
                            </BlueOnGreenTooltip>
                        </div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                <th>Day</th>
                                <th>Date</th>
                                <th>Starting Time</th>
                                <th>Ending Time</th>
                                <th>Total Hours</th>
                                <th>Floating Day</th>
                                <th>Holiday</th>
                                <th>Vacation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.timesheet.days.map((day, idx) => {
                                    return ([
                                        <tr key={idx}>
                                        <td>{day.name}</td>
                                        <td>{day.date} </td>
                                        <td>
                                        <select value={day.startTime} onChange={(e) => this.handleStartTimeChange(e, idx)}>
                                            {timeOptions}
                                        </select>
                                        </td>
                                        <td>
                                        <select value={day.endTime} onChange={(e) => this.handleEndTimeChange(e, idx)}>
                                            {timeOptions}
                                        </select>
                                        </td>
                                        <td>
                                        <select value={day.totalHours} onChange={(e) => this.handleTotalHoursChange(e, idx)}>
                                            {hoursOptions}
                                        </select>
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={day.isFloatingDay}
                                                onChange={(e) => this.handleIsFloatingDayChange(e, idx)} />
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={day.isHoliday}
                                                onChange={(e) => this.handleisHolidayChange(e, idx)} />
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={day.isVacationDay}
                                                onChange={(e) => this.handleisVacationDayChange(e, idx)} />
                                        </td>
                                        </tr>
                                    ]);
                                })}
                            </tbody>
                        </Table>

                        <div className="row">
                            <div className="col-sm">
                                <select  id="submissionStatus" onChange={(e) => this.handleSubmissionStatus(e)}>
                                    <option value="N/A">N/A</option>
                                    <option value="Approved Timesheet">Approved Timesheet</option>
                                    <option value="UnApproved Timesheet">UnApproved Timesheet</option>
                                </select>
                            </div>
                            <div className="col-sm">
                                <input type="submit" value="Save" onClick={this.handleSubmit}/>
                            </div>                   
                        </div>

                       
                        </form>
                    </div>
                    : null
                }
            </div>
        );
    }

}