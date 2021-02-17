import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table'

export default class TimesheetBoard extends React.Component {
    constructor() {
        super();
        this.state = {timesheet: ''};
    }

    componentDidMount() {
        if (this.props.weekending === '2021-02-13' || this.props.weekending === '2021-02-06') {
            console.log("loading data");
            this.loadData();
        }
    }

    loadData() {
        axios.get('/api/timesheet/1/weekending?weekending='+this.props.weekending)
            .then(response => {
                console.log(response.data)
                this.setState({
                    timesheet: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps) {
        // If it's a new weekending, load data again
        if (this.props.weekending !== prevProps.weekending && (this.props.weekending === '2021-02-13' || this.props.weekending === '2021-02-06')){
            this.loadData();
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
            timesheet.totalBillingHour = this.computeTotalBillingHours(timesheet.totalBillingHour, timesheet.days[idx].totalHours, event.target.value); 
            timesheet.totalCompensatedHour = timesheet.totalBillingHour + this.computeTotalCompensatedHours(timesheet.days);
            timesheet.days[idx].totalHours = event.target.value;   
            return { timesheet };  
          })
    }

    handleIsFloatingDayChange(event, idx) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet);  
            timesheet.days[idx].isFloatingDay = value; 
            timesheet.totalCompensatedHour = timesheet.totalBillingHour + this.computeTotalCompensatedHours(timesheet.days);
            timesheet.numOfFloatingDays = timesheet.numOfFloatingDays + (value? 1: -1);
            return { timesheet };                                 
          })
    }

    handleisVacationDayChange(event, idx) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet);  
            timesheet.days[idx].isVacationDay = value; 
            timesheet.totalCompensatedHour = timesheet.totalBillingHour + this.computeTotalCompensatedHours(timesheet.days);
            timesheet.numOfVacationDays = timesheet.numOfVacationDays + (value? 1: -1);
            return { timesheet };                                 
          })
    }

    handleisHolidayChange(event, idx) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState(prevState => {
            let timesheet = Object.assign({}, prevState.timesheet);  
            timesheet.days[idx].isHoliday = value; 
            timesheet.totalCompensatedHour = timesheet.totalBillingHour + this.computeTotalCompensatedHours(timesheet.days);
            timesheet.numOfHolidays = timesheet.numOfHolidays + (value? 1: -1);
            return { timesheet };                                 
          })
    }

    computeTotalBillingHours(totalBillingHours, oldHour, newHour) {
        return parseInt(totalBillingHours) + parseInt(newHour) - parseInt(oldHour);
    }

    computeTotalCompensatedHours(days){
        var totalCompensatedHour = 0;
        for(let i = 0; i < days.length; i++){
            if(days[i].isFloatingDay || days[i].isHoliday || days[i].isVacationDay){
                totalCompensatedHour = totalCompensatedHour + 8;
            };
        }
        return totalCompensatedHour;
    }

    handleSubmit = event => {
        if(document.getElementById("submissionStatus").value === "Approved Timesheet"){
            this.setState(prevState => {
                let timesheet = Object.assign({}, prevState.timesheet);  
                timesheet.submissionStatus = "complete";
                return { timesheet };                                 
              })
        }
        else{
            this.setState(prevState => {
                let timesheet = Object.assign({}, prevState.timesheet);  
                timesheet.submissionStatus = "incomplete";
                return { timesheet };                                 
              })
        }
        event.preventDefault();
        axios.post('/api/timesheet/save', this.state.timesheet)
          .then(res => {
            console.log(res);
          })
    }

    onClickSetDefault = event => {
        event.preventDefault();
        axios.post('/api/timesheet/default/save', this.state.timesheet)
        .then(res => {
        console.log(res);
        });
        alert("set to default");
    }

    

    render() {
        var ReactS3Uploader = require('react-s3-uploader');
        
        const hoursOptions = [];
        for(let i = 0; i < 25; i++){
            hoursOptions.push(<option key = {i} value={i}>{i}</option>)
        }
        const timeOptions = [];
        for(let j = 0; j < 12; j++){
            const time = j + ":00 AM.";
            timeOptions.push(<option key={time} value= {time} >{time}</option>)
        }
        for(let j = 0; j < 12; j++){
            const time = j + ":00 PM.";
            timeOptions.push(<option key={time} value= {time} >{time}</option>)
        }

        return (
            <div>
                {
                    this.state.timesheet ?
                    <div>        
                     <form>
                        <div className="row">
                            <strong className="col-sm">Weekending Day: {this.props.weekending}</strong>
                            <strong className="col-sm">Total Billing Hours: {this.state.timesheet.totalBillingHour}</strong>
                            <strong className="col-sm">Total Compensated Hours: {this.state.timesheet.totalCompensatedHour}</strong>
                            <input type="submit" value="Set Default" onClick={this.onClickSetDefault}/>
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
                                <th>Vocation</th>
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

                        <select id="submissionStatus">
                            <option value="Approved Timesheet">Approved Timesheet</option>
                            <option value="UnApproved Timesheet">UnApproved Timesheet</option>
                        </select>
                        <br />

                        <input type="submit" value="Save" onClick={this.handleSubmit}/>
                        </form>
                    </div>
                    : null
                }
            </div>
        );
    }

}