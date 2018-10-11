import React, { Component } from "react";
import "./App.css";
import DatePicker from "./DatePicker";

class App extends Component {
  render() {
    const showToday = false;
    return (
      <div className="App">
        <DatePicker showToday={showToday} />
      </div>
    );
  }
}

export default App;
