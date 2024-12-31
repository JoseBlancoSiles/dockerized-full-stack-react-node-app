import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('csvFile', document.getElementById('csvFile').files[0]);

    try {
      const response = await fetch('/api/uploadCsv', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        const errorText = await response.text();
        alert(`File upload failed: ${errorText}`);
      }
    } catch (error) {
      alert(`File upload failed: ${error.message}`);
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Upload CSV File</h1>
        <form id="uploadForm" onSubmit={this.handleSubmit} enctype="multipart/form-data">
          <input type="file" id="csvFile" name="csvFile" accept=".csv" />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}