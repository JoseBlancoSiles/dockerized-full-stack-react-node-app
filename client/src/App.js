import React, { Component } from 'react';

class App extends Component {
  handlePing = async () => {
    try {
      const response = await fetch('http://localhost:8080/ping'); // Use localhost and the exposed port
      console.log('Attempting to ping server...');
      if (response.ok) {
        const json = await response.json();
        this.setState({ feedback: `Ping response: ${json.message}` });
      } else {
        const errorText = await response.text();
        this.setState({ feedback: `Ping failed: ${errorText}` });
      }
    } catch (error) {
      this.setState({ feedback: `Ping failed: ${error.message}` });
      console.error('Ping error:', error);
    }
  };

  state = {
    feedback: ''
  };

  render() {
    return (
      <div>
        <h1>Ping Server</h1>
        <button onClick={this.handlePing}>Ping Server</button>
        <p>{this.state.feedback}</p>
      </div>
    );
  }
}

export default App;