import React, { Component } from "react";
import DayPicker from "./DayPicker";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import styled from "styled-components";

const Wrapper = styled.div`
  background: white;
  max-width: 300px;
  margin: 1em auto;
  max-height: 300px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Picker = styled.div`
  padding: 10px;
`;

const Dropdown = styled.div`
  border-top: 1px solid #ccc;
`;

class DatePicker extends Component {
  constructor(props) {
    super(props);
    let today = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    this.state = {
      showDayPicker: false,
      showMonthPicker: false,
      showYearPicker: false,
      date: today.getDate(),
      month: months[today.getMonth()],
      year: today.getFullYear()
    };

    this.renderMonthPicker = this.renderMonthPicker.bind(this);
    this.renderYearPicker = this.renderYearPicker.bind(this);
    this.onDatePicked = this.onDatePicked.bind(this);
  }

  renderMonthPicker(d) {
    console.log(d);
    this.setState({
      showDayPicker: false,
      showMonthPicker: true,
      date: d
    });
  }

  renderYearPicker(m) {
    console.log(m);
    this.setState({
      showMonthPicker: false,
      showYearPicker: true,
      month: m
    });
  }

  onDatePicked(y) {
    console.log(y);
    this.setState({
      showYearPicker: false,
      year: y
    });
  }

  render() {
    const {
      showDayPicker,
      showMonthPicker,
      showYearPicker,
      date,
      month,
      year
    } = this.state;
    return (
      <Wrapper>
        <Picker>
          <button
            onClick={() => {
              this.setState({ showDayPicker: true });
            }}
          >
            {date}/{month}/{year}
          </button>
        </Picker>
        <Dropdown>
          {showDayPicker && <DayPicker onDatePicked={this.renderMonthPicker} />}
          {showMonthPicker && (
            <MonthPicker onMonthPicked={this.renderYearPicker} />
          )}
          {showYearPicker && <YearPicker onYearPicked={this.onDatePicked} />}
        </Dropdown>
      </Wrapper>
    );
  }
}

export default DatePicker;
