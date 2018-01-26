import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import './style.css';

export default class SearchBar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.onSearch(this.input.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar__Group">
          <input
              ref={e => this.input = e}
              className="SearchBar__input"
              type="text"
              placeholder="Where to?" />
          <button
              className="SearchBar__button"
              onClick={this.onClick}
              type="submit">
            Go
          </button>
        </div>
      </div>
    );
  }
}
