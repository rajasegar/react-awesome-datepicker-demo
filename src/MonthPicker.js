import React, { Component } from "react";
import styled from "styled-components";

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
`;

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.pickMonth = this.pickMonth.bind(this);
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

    const { onMonthPicked } = this.props;
    return (
      <div>
        <Caption>Select month</Caption>
        <Wrapper>
          {months.map(m => (
            <MonthButton key={m} onClick={this.pickMonth}>
              {m}
            </MonthButton>
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default DatePicker;
