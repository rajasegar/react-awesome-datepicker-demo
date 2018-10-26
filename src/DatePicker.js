import React, { Component } from "react";
import DayPicker from "./DayPicker";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import styled from "styled-components";
import transition from "styled-transition-group";
//import { format } from "date-fns";

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
    this.state = {
      showDayPicker: false,
      showMonthPicker: false,
      showYearPicker: false,
      showDropdown: false,
      formattedDate: "DD/MM/YYYY"
    };

    this.dateInput = React.createRef();
    this.monthInput = React.createRef();
    this.yearInput = React.createRef();

    this.renderDayPicker = this.renderDayPicker.bind(this);
    this.renderMonthPicker = this.renderMonthPicker.bind(this);
    this.renderYearPicker = this.renderYearPicker.bind(this);
    this.onDatePicked = this.onDatePicked.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.resetDate = this.resetDate.bind(this);
  }

  componentDidMount() {
    this.resetDate();
  }

  resetDate() {
    const { showToday } = this.props;
    let today = new Date();
    let _date = showToday ? today.getDate() : "DD";
    let _month = showToday ? today.getMonth() + 1 : "MM";
    let _year = showToday ? today.getFullYear() : "YYYY";

    this.setState({
      date: _date,
      month: _month,
      year: _year,
      formattedDate: `${_date}/${_month}/${_year}`
    });
  }

  renderDayPicker() {
    this.setState({
      showDayPicker: true,
      showDropdown: true
    });
    //this.resetDate();
    this.dateInput.current.select();
  }

  renderMonthPicker(d) {
    const _date = d.toString().padStart(2, "0");
    const { month, year } = this.state;

    this.setState({
      showDayPicker: false,
      showMonthPicker: true,
      date: _date,
      formattedDate: `${_date}/${month}/${year}`
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

    const [_date, _month, _year] = _value.split("/");
    //console.log(_date);
    //console.log(_month);
    //console.log(_year);

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
    }

    if (_year && _year.length === 4) {
      this.setState({
        showDropdown: false,
        showYearPicker: false
      });
    }

    this.setState({ formattedDate: _value });
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
