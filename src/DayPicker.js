import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  max-width: 300px;
  margin: 0 auto;
`;

const DayButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  text-align: center;
  width: 32px;
  border-radius: 4px;
  height: 32px;
  margin: 0 auto;

  &:focus,
  &:active,
  &:hover {
    background: #ff7494;
  }
`;

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.pickDate = this.pickDate.bind(this);
  }

  pickDate(e) {
    this.props.onDatePicked(e.target.textContent);
  }

  render() {
    const days = [];
    for (let i = 0; i < 31; i++) days.push(i + 1);
    const { onDatePicked } = this.props;
    return (
      <div>
        <p>Select a day</p>
        <Wrapper>
          {days.map(d => (
            <DayButton key={d} onClick={this.pickDate}>
              {d}
            </DayButton>
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default DatePicker;
