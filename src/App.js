import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(){
    super();

    this.state = {
        cityName: "",
        currWeatherRes: {}
    }
}

  handleSubmit = (event) => {
    event.preventDefault();
    //alert(`The name you entered was:`+ this.state.cityName);

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+this.state.cityName+`&appid=f3ee66722740d00cc6f197cbcab3d534`, {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((res) => {
        this.setState({
          currWeatherRes: res
        })
      });
  }

  handleChange = (event) => {
    this.setState({cityName:event.target.value});
  }

  render() {
    return (
      <div className="weather-app">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.cityName} onChange={this.handleChange} placeholder="Enter City"/>
            <button type="submit" value="Submit">Submit</button>
          </form>
          {(typeof this.state.currWeatherRes.main != "undefined") ? (
              <div className="weather-details">
                  <div className="location-ctr">
                      <div className="location">{this.state.currWeatherRes.name}, {this.state.currWeatherRes.sys.country}</div>
                  </div>
                  <div className="weather-ctr">
                      <div className="weather-temp">{this.state.currWeatherRes.main.temp}F</div>
                      <div className="weather-name">{this.state.currWeatherRes.weather[0].main}</div>
                  </div>
              </div>
          ):('')}
      </div>
    );
  }
}

export default App;
