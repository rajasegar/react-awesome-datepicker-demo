import React, { Component } from "react";
import styled from "styled-components";
import transition from "styled-transition-group";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  max-width: 250px;
  max-height: 217px;
  overflow-y: auto;
  margin: 0 auto;
`;

const Caption = styled.p`
  color: #ccc;
  font-size: 0.75em;
`;

const YearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
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

`;

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.pickYear = this.pickYear.bind(this);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    });
  }

  pickYear(e) {
    this.setState({ show: false });
    this.props.onYearPicked(e.target.textContent);
  }

  render() {
    let today = new Date();
    let y = today.getFullYear();
    let minYear = y - 50;
    let maxYear = y + 50;
    const years = [];
    for (let i = minYear; i < maxYear; i++) years.push(i);
    const { onYearPicked } = this.props;
    const { show } = this.state;
    return (
      <Transition in={show}>
        <Caption>Select year</Caption>
        <Wrapper>
          {years.map(y => (
            <YearButton onClick={this.pickYear} key={y}>
              {y}
            </YearButton>
          ))}
        </Wrapper>
      </Transition>
    );
  }
}

export default DatePicker;
