import React, { Component } from "react";
import "./App.css";
import imagePdf from "./main";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
    };
  }
  handleChange(e) {
    var data = e.target.value
    this.setState({
      imagesData: JSON.parse(data)
    });
  }
  handleClick() {
    const { imagesData = [] } = this.state;
    imagePdf(imagesData, "title");
  }
  render() {
    const { imagesData = [] } = this.state;
    const _imagesData = JSON.stringify(imagesData)
    return (
      <div className="App">
        <textarea value={_imagesData} onChange={this.handleChange} />
        <br/>
        <button onClick={this.handleClick}>Export PDF</button>
      </div>
    );
  }
}

export default App;