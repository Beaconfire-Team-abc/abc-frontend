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
            timesheet.numOfHolidays = timesheet.numOfHolidays + (value? 1: -1);
            return { timesheet };                                 
          })
    }

    computeTotalBillingHours(totalBillingHours, oldHour, newHour) {
        return parseInt(totalBillingHours) + parseInt(newHour) - parseInt(oldHour);
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('/api/timesheet/save', this.state.timesheet)
          .then(res => {
            console.log(res);
          })
      }

    render() {
        // console.log(this.props.weekending);
        // console.log(this.state.timesheet);
        return (
            <div>
                {
                    this.state.timesheet ?
                    <div>
                        <p>Weekending Day: {this.props.weekending}</p>
                        <p>Total Billing Hours: {this.state.timesheet.totalBillingHour}</p>
                        <p>Total Compensated Hours: {this.state.timesheet.totalCompensatedHour}</p>

                        <form onSubmit={this.handleSubmit}>
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
                                            <option value="8:00 A.M.">8:00 A.M.</option>
                                            <option value="9:00 A.M.">9:00 A.M.</option>
                                            <option value="10:00 A.M.">10:00 A.M.</option>
                                            <option value="11:00 A.M.">11:00 A.M.</option>
                                        </select>
                                        </td>
                                        <td>
                                        <select value={day.endTime} onChange={(e) => this.handleEndTimeChange(e, idx)}>
                                            <option value="4:00 P.M.">4:00 P.M.</option>
                                            <option value="5:00 P.M.">5:00 P.M.</option>
                                            <option value="6:00 P.M.">6:00 P.M.</option>
                                            <option value="7:00 P.M.">7:00 P.M.</option>
                                        </select>
                                        </td>
                                        <td>
                                        <select value={day.totalHours} onChange={(e) => this.handleTotalHoursChange(e, idx)}>
                                            <option value="6">0</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
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

                        <input type="submit" value="Save" />
                        </form>
                    </div>
                    : null
                }
            </div>
        );
    }

}