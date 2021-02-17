import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimesheetBoard from './TimesheetBoard';
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Timesheet (props) {
    let { weekending } = useParams();
    const [startDate, setStartDate] = useState(new Date());

    const formatDate = str => {
        str = str.toString();
        let parts = str.split(" ");
        let months = {
          Jan: "01",
          Feb: "02",
          Mar: "03",
          Apr: "04",
          May: "05",
          Jun: "06",
          Jul: "07",
          Aug: "08",
          Sep: "09",
          Oct: "10",
          Nov: "11",
          Dec: "12"
        };
        return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
      };
    
    return (
        <div>
            <Container>
                <div>Pick Week Ending:  <DatePicker selected={startDate} onChange={date => setStartDate(date)} /></div>
                <TimesheetBoard weekending={formatDate(startDate)} weekendingParam={weekending} userId={props.userId}/>
            </Container>
        </div>
    );
}

export default Timesheet;