import HeadComponent from './components/Head';
import MainBody from './components/MainBody';
import './App.css';
import React from "react";
import axios from "axios";

class App extends React.Component {

    componentDidMount() {
        axios.get('http://192.168.1.14:8080/auth/inform').then((res) => this.setState({visiButtons: res.data}));
    }

    state = {
        visiButtons: ''
    }

    render() {
      return (
          <div className="App">
              <HeadComponent
                  visiButtons={this.state.visiButtons}
              />
              <MainBody/>
          </div>
      );
  }
}

export default App;

