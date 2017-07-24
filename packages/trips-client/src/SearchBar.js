import React, { Component, PropTypes } from 'react';

export default class SearchBar extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  }

  onClick(e) {
    e.preventDefault();
    this.props.onSearch(this.input.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
            ref={e => this.input = e}
            className="SearchBar__input"
            type="text"
            placeholder="Where to?" />
        <button
            className="SearchBar__button"
            onClick={this.onClick.bind(this)}
            type="submit">
          Go
        </button>
      </div>
    );
  }
}
