import React, { Component } from "react";
import styled from "styled-components";
import transition from "styled-transition-group";
import { format } from "date-fns";

const locales = {
  es: require("date-fns/locale/es"),
  fr: require("date-fns/locale/fr")
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  max-width: 250px;
  min-height: 167px;
  max-height: 167px;
  margin: 25px auto;
`;

const Caption = styled.p`
  color: #555;
  font-size: 0.75em;
`;
const MonthButton = styled.button`
  background: none;
  border: ${props => (props.currentMonth ? "1px solid black" : "none")};
  cursor: pointer;
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  margin: 0 auto;

  &:focus,
  &:active,
  &:hover {
    background: #ff7494;
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    user-select: none;
  }
`;

const Transition = transition.div.attrs({
  unmountOnExit: true,
  timeout: 1000
})`
&:enter { 
  transform: translateX(300px);
  }
&:enter-active {
  transform: translateX(0px);
  transition: transform 400ms ease-in-out;
}
&:exit { 
  transform: translateX(0px);
  }
&:exit-active {
  transform: translateX(300px);
  transition: transoform 400ms ease-in;
}
`;

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.pickMonth = this.pickMonth.bind(this);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    });
  }

  pickMonth(e) {
    this.props.onMonthPicked(e.target.dataset.month);
  }

  render() {
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

    const monthWith30days = [
      "February",
      "April",
      "June",
      "September",
      "November"
    ];

    const { date } = this.props;
    const { show } = this.state;
    const today = new Date();
    return (
      <Transition in={show}>
        <Caption>Select month</Caption>
        <Wrapper>
          {months.map((m, index) => (
            <MonthButton
              key={m}
              onClick={this.pickMonth}
              hidden={
                (date > 30 && monthWith30days.includes(m)) ||
                (date === "30" && m === "February")
              }
              data-month={index + 1}
              currentMonth={index === today.getMonth()}
            >
              {format(
                new Date(today.getFullYear(), months.indexOf(m), date),
                "MMMM",
                {
                  locale: locales["en"]
                }
              )}
            </MonthButton>
          ))}
        </Wrapper>
      </Transition>
    );
  }
}

export default DatePicker;
