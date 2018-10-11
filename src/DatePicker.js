import React, { Component } from "react";
import DayPicker from "./DayPicker";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import styled from "styled-components";
import transition from "styled-transition-group";
import { format } from "date-fns";

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

const Wrapper = styled.div`
  background: white;
  max-width: 300px;
  margin: 1em auto;
  max-height: 300px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const TriggerInput = styled.input`
  border: none;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  color: #555;
  width: 100%;
  background: none;
  text-align: center;
`;

const TriggerWrapper = styled.div`
  padding: 10px;
`;

const Dropdown = transition.div.attrs({
  unmountOnExit: true,
  timeout: 100
})`
  border-top: 1px solid #ccc;
  min-height: 271px;
  &:enter { opacity: 0.01;}
  &:enter-active {
  opacity: 1;
    transition: opacity 200ms ease-in-out;
  }
  &:exit { opacity: 1; }
  &:exit-active {
    opacity: 0.01;
    transition: opacity 1ms ease-in;
  }
`;

class DatePicker extends Component {
  constructor(props) {
    super(props);
    const { showToday } = props;
    let today = new Date();
    let _date = showToday ? today.getDate() : "DD";
    let _month = showToday ? today.getMonth() + 1 : "MM";
    let _year = showToday ? today.getFullYear() : "YYYY";
    this.state = {
      showDayPicker: false,
      showMonthPicker: false,
      showYearPicker: false,
      showDropdown: false,
      date: _date,
      month: _month,
      year: _year,
      formattedDate: `${_date}/${_month}/${_year}`
    };

    this.dateInput = React.createRef();
    this.monthInput = React.createRef();
    this.yearInput = React.createRef();

    this.renderDayPicker = this.renderDayPicker.bind(this);
    this.renderMonthPicker = this.renderMonthPicker.bind(this);
    this.renderYearPicker = this.renderYearPicker.bind(this);
    this.onDatePicked = this.onDatePicked.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.focusDate = this.focusDate.bind(this);
    this.focusMonth = this.focusMonth.bind(this);
    this.focusYear = this.focusYear.bind(this);
  }

  focusDate() {
    this.dateInput.current.focus();
    this.dateInput.current.select(0, 2);
  }

  focusMonth() {
    this.dateInput.current.focus();
    this.dateInput.current.select(3, 2);
  }

  focusYear() {
    this.dateInput.current.focus();
    this.dateInput.current.select(6, 4);
  }

  renderDayPicker() {
    this.setState({
      showDayPicker: true,
      showDropdown: true
    });
    this.dateInput.current.select();
  }

  renderMonthPicker(d) {
    const _date = d.toString().padStart(2, "0");

    this.setState({
      showDayPicker: false,
      showMonthPicker: true,
      date: _date
    });
  }

  renderYearPicker(m) {
    const _month = m.toString().padStart(2, "0");
    const { date, year } = this.state;
    this.setState({
      showMonthPicker: false,
      showYearPicker: true,
      month: _month,
      formattedDate: `${date}/${_month}/${year}`
    });
  }

  onDatePicked(y) {
    const { date, month } = this.state;
    this.setState({
      showDropdown: false,
      showYearPicker: false,
      year: y,
      formattedDate: `${date}/${month}/${y}`
    });

    /*

    const locales = {
      en: require("date-fns/locale/en"),
      eo: require("date-fns/locale/eo"),
      ru: require("date-fns/locale/ru"),
      fr: require("date-fns/locale/fr")
    };

    console.log(year, month, date);
    window.__localeId__ = "fr";
    console.log(
      format(new Date(2018, month, date), "DD MMMM, YYYY", {
        locale: locales[window.__localeId__]
      })
    );
    */
  }

  onDateChange(e) {
    const _value = e.target.value;
    console.log(_value);
    this.setState({ formattedDate: _value });

    const [_date, _month, _year] = _value.split("/");
    const showMonth = _value.indexOf("/") >= 1;
    const showYear = _value.lastIndexOf("/") >= 3;
    if (showMonth) {
      this.renderMonthPicker(_date);
    }
    if (showYear) {
      this.setState({
        showMonthPicker: false,
        showYearPicker: true,
        month: _month
      });
    } /*
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/gm;
    let m;
    while ((m = regex.exec(_value)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      const [_date, _month, _year] = m;
      const { date, month, year } = this.state;
      const isValidDate = _date >= 1 && _date <= 31 && _date !== "DD";
      const isValidMonth = _month >= 1 && _month <= 12 && _month !== "MM";
      const isValidYear = _year !== "YYYY";
      if (isValidDate || _date !== date) {
        this.renderMonthPicker(_date);
      }

      if (isValidMonth || _month !== month) {
        this.renderYearPicker(_month);
      }

      if (isValidYear) {
        this.setState({ showDropdown: false });
      }
      console.log(_date, _month, _year);
    }
    */
  }

  render() {
    const {
      showDayPicker,
      showMonthPicker,
      showYearPicker,
      showDropdown,
      date,
      formattedDate
    } = this.state;
    return (
      <Wrapper>
        <TriggerWrapper>
          <TriggerInput
            value={formattedDate}
            onFocus={this.renderDayPicker}
            onChange={this.onDateChange}
            onBlur={this.onDateChange}
            innerRef={this.dateInput}
          />
        </TriggerWrapper>
        <Dropdown in={showDropdown}>
          {showDayPicker && <DayPicker onDatePicked={this.renderMonthPicker} />}
          {showMonthPicker && (
            <MonthPicker date={date} onMonthPicked={this.renderYearPicker} />
          )}
          {showYearPicker && <YearPicker onYearPicked={this.onDatePicked} />}
        </Dropdown>
      </Wrapper>
    );
  }
}

export default DatePicker;
