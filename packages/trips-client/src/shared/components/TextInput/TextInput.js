import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './TextInput.css';

function TextInputInner({
  className,
  placeholder,
  onMount,
  ...props,
}) {
  return (
    <input
      className={cn('TextInput', className)}
      type="text"
      placeholder={placeholder}
      ref={onMount}
      {...props}
    />
  );
}

export default class TextInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    className: PropTypes.string,
    clearable: PropTypes.bool,
    onClear: PropTypes.func,
  }

  state = {
    isEmpty: true,
  }

  render() {
    const { clearable, onClear, ...props } = this.props;
    const { isEmpty } = this.state;

    if (clearable) {
      return (
        <span className="TextInput__Clearable">
          <TextInputInner
            onMount={r => this.input = r}
            onChange={(e) => {
              this.setState({ isEmpty: !e.target.value });
            }}
            {...props}
          />
          <button
            className={cn({
              'TextInput__Clear': true,
              'TextInput__Clear--empty': isEmpty,
            })}
            onClick={() => {
              if (onClear && !onClear(this.input.value)) {
                return;
              }
              this.input.value = '';
              this.input.focus();
              this.setState({ isEmpty: true });
            }}
          >
            &times;
          </button>
        </span>
      );
    }
    return <TextInputInner {...props} />;
  }
}
