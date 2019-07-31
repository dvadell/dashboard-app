import React, { Component } from "react";
import mermaid, { mermaidAPI } from "mermaid";
import "./Diagram.css";

class Diagram extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      diagram: ""
    };
  }

  formatMermaidNode = label => {
    if (!label.trim()) return "?";
    const sanitized_label = label.trim().replace(/\[|\]|\(|\)\{\}/g, "");
    // Mermaid can't handle spaces in node labels, so we have to turn
    // 'This label' to 'This_label[This label]'
    return sanitized_label.replace(/ /g, "_") + "[" + sanitized_label + "]";
  };

  componentDidMount() {
    // Take the children (A --> B --> C, etc) and turn it into
    // Mermaid's markup (graph TD \n A --> B\n B --> C)
    let children = this.props.children.toString();
    let mermaidMarkup = "graph TD";
    children.split("\n").forEach(line => {
      let nodes = line.split("-->");
      for (let i = 0; i < nodes.length - 1; i++) {
        let label1 = this.formatMermaidNode(nodes[i]);
        let label2 = this.formatMermaidNode(nodes[i + 1]);
        mermaidMarkup = mermaidMarkup + "\n" + label1 + " --> " + label2;
      }
    });
    console.log("mermaidMarkup", { mermaidMarkup });

    mermaid.initialize({
      flowchart: {
        htmlLabels: false,
        theme: null,
        useMaxWidth: true
      }
    });

    try {
      mermaidAPI.render(
        "g" + this.props.name,
        mermaidMarkup,
        // (html) => this.setState({diagram: html}),
        html => {
          this.setState({ diagram: html });
        }
      );
    } catch {
      this.setState({ diagram: "ERROR" });
    }
  }

  render() {
    return (
      <div>
        <div
          //   id={'d' + this.props.name}
          dangerouslySetInnerHTML={{ __html: this.state.diagram }}
        ></div>
      </div>
    );
  }
}

export default Diagram;
