import React, { Component } from "react";
import styled from "styled-components";
import transition from "styled-transition-group";

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
  color: #ccc;
  font-size: 0.75em;
`;
const MonthButton = styled.button`
  background: none;
  border: none;
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
    this.props.onMonthPicked(e.target.textContent);
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

    const { onMonthPicked, date } = this.props;
    const { show } = this.state;
    return (
      <Transition in={show}>
        <Caption>Select month</Caption>
        <Wrapper>
          {months.map(m => (
            <MonthButton
              key={m}
              onClick={this.pickMonth}
              disabled={
                (date > 30 && monthWith30days.includes(m)) ||
                (date === "30" && m === "February")
              }
            >
              {m}
            </MonthButton>
          ))}
        </Wrapper>
      </Transition>
    );
  }
}

export default DatePicker;
