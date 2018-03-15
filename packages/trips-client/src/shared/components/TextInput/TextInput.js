import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isEmptyString from 'utils/isEmptyString';
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
    initialValue: PropTypes.string,
  }

  state = {
    isEmpty: true,
  }

  componentWillReceiveProps(nextProps) {
    console.log('checking for initial value: %j', nextProps);
    // this allows the initial value to be deferred
    // TODO: consider just accepting initialValue as a promise
    if (
        !this.props.initialValue
        && nextProps.initialValue
        && isEmptyString(this.input.value)
    ) {
      this.input.value = nextProps.initialValue;
      this.setState({ isEmpty: false });
    }
  }

  render() {
    const { clearable, onClear, initialValue, ...props } = this.props;
    const { isEmpty } = this.state;

    if (!clearable) {
      return <TextInputInner {...props} />;
    }

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
          tabIndex={-1}
        >
          &times;
        </button>
      </span>
    );
  }
}
