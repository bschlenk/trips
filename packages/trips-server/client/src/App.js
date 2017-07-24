import React, { Component } from 'react';
import MapView from './MapView';
import SearchBar from './SearchBar';
import './App.css';

export default class App extends Component {
  onSearch(query) {
    console.log(query);
  }

  render() {
    return (
      <div className="App">
        <SearchBar onSearch={this.onSearch.bind(this)} />
        <MapView />
      </div>
    );
  }
}
