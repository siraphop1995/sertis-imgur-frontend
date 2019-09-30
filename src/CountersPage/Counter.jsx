import React, { Component } from 'react';

class Counter extends Component {
  state = {};
  style = {
    //  fontSize : 20,
    fontWeight: 'bold'
  };

  componentDidMount() {
    console.log('Counter - Mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("Counter - Updated");
    // console.log("prevProps", prevProps);
    // console.log("prevState", prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      //Ajax call and get new data from server
      console.log('Updated counter #', prevProps.counter.id);
    }
  }

  componentWillUnmount() {
    console.log('Counter - Unmounted #', this.props.counter.id);
  }

  render() {
    console.log('Counter - Rendered');
    return (
      <div>
        {this.props.children}
        <span style={this.style} className={this.getBadgeClass()}>
          {this.formatCount()}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClass() {
    let classes = 'badge m-2 badge-';
    classes += this.props.counter.value === 0 ? 'warning' : 'primary';
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? 'zero' : value;
  }
}

export default Counter;
