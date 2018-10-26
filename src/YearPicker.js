import React, { Component } from "react";
import styled from "styled-components";
import transition from "styled-transition-group";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  max-width: 250px;
  max-height: 175px;
  overflow-y: scroll;
  margin: 0 auto;
`;

const Caption = styled.p`
  color: #555;
  font-size: 0.75em;
  margin-bottom: 0;
`;

const YearButton = styled.button`
  background: none;
  border: ${props => (props.currentYear ? "1px solid black" : "none")};
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

const Pointer = styled.button`
  margin: 0 auto;
  cursor: pointer;
  border: none;
  background: none;
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

    this.wrapper = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
      // need to revisit this
      this.wrapper.current.scrollTop = 188;
    });
  }

  pickYear(e) {
    this.setState({ show: false });
    this.props.onYearPicked(e.target.textContent);
  }

  render() {
    let today = new Date();
    let currentYear = today.getFullYear();
    let minYear = currentYear - 50;
    let maxYear = currentYear + 50;
    const years = [];
    for (let i = minYear; i < maxYear; i++) years.push(i);
    const { show } = this.state;
    return (
      <Transition in={show}>
        <Caption>Select year</Caption>
        <Pointer
          title="Scroll Up to choose previous years"
          onClick={() => (this.wrapper.current.scrollTop -= 21)}
        >
          ▲
        </Pointer>
        <Wrapper innerRef={this.wrapper}>
          {years.map(y => (
            <YearButton
              onClick={this.pickYear}
              key={y}
              currentYear={y === currentYear}
            >
              {y}
            </YearButton>
          ))}
        </Wrapper>
        <Pointer
          title="Scroll down to choose next years"
          onClick={() => (this.wrapper.current.scrollTop += 21)}
        >
          ▼
        </Pointer>
      </Transition>
    );
  }
}

export default DatePicker;
