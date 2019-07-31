import React, { Component, createRef } from "react";

class AccordeonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      height: 0
    };
  }

  // There's a minimum height. Must be set here, because we are already messing
  // with the height.
  toggleOpen = () => {
    let height = this.ref.current.scrollHeight;
    height < 100 && (height = height + 100);
    this.setState({ height });
    this.setState({ open: !this.state.open });
    console.log("toggleOpen:", this.state.open, "; height:", this.state.height);
  };

  ref = createRef();

  componentDidMount() {
    if (this.ref.current) {
      let h = 40;
      Array.from(this.ref.current.childNodes).forEach(node => {
        h = h + node.offsetHeight;
      });
      this.setState({ height: h });
    }
  }

  render() {
    let title = this.props.title;
    // style={ this.state.open ? { height: this.state.height + 'px' } : { height: 0 }  }

    return (
      <section
        className={
          "accordion-item" + (this.state.open ? " accordion-item--default" : "")
        }
      >
        <h2>
          <span onClick={this.toggleOpen}>{title}</span>
        </h2>
        <div
          className="accordion-item-content"
          ref={this.ref}
          height={this.state.height}
          style={this.state.open ? { height: this.state.height + "px" } : {}}
        >
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default AccordeonItem;
