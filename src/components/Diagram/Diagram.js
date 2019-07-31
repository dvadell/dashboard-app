import React, { Component } from "react";
import mermaid, { mermaidAPI } from "mermaid";
import { splitInTwo, wikiParseToTree } from "../WikiText/utils";
import "./Diagram.css";

class Diagram extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      diagram: ""
    };
  }

  /**
        wikiRules - rules that turn wikiText to a tree
        each key of the object corresponds to an array.
        The first member is the start of the tag
        The second is for options (like done: true|false)
        The third is the end of the tag.
        For example, internal links look like [[something]]
    */
  diaRules = {
    arrowWithLabel: ["-- ", () => ({ done: true }), " -->"],
    arrow: [
      " --> ",
      content => {
        return { done: true };
      },
      undefined
    ]
  };

  // This will turn the tree to a number of react components
  treeToReact = tree => {
    const tagToReact = {
      arrowWithLabel: content => {
        let a = " -->|" + content + "| ";
        return a;
      },
      arrow: content => " --> ",
      text: content => this.formatMermaidNode(content)
    };
    return tree.map(tag => {
      if (tagToReact[tag.type]) {
        return tagToReact[tag.type](tag.content);
      } else {
        return "Hmmm... no handler for " + tag.type;
      }
    });
  };

  diaParser = (diaMarkup, rules = this.diaRules) => {
    if (!diaMarkup) return "";
    const tree = wikiParseToTree(diaMarkup, rules);
    // console.log({ tree });
    const reactFromTree = this.treeToReact(tree);
    // console.log({ reactFromTree });
    return reactFromTree;
  };

  formatMermaidNode = label => {
    if (!label.trim()) return "?";
    const sanitized_label = label.trim().replace(/\[|\]|\(|\)\{\}/g, "");
    // Mermaid can't handle spaces in node labels, so we have to turn
    // 'This label' to 'This_label[This label]'
    return sanitized_label.replace(/ /g, "") + "[" + sanitized_label + "]";
  };

  componentDidMount() {
    // Parse the markup
    let parsedDiaMarkup = "";
    this.props.children.split("\n").forEach(line => {
      let parsed = this.diaParser(line, this.diaRules);
      if (parsed) {
        parsedDiaMarkup = parsedDiaMarkup + "\n" + parsed.join("");
      }
    });

    // Take the children (A --> B --> C, etc) and turn it into
    // Mermaid's markup (graph TD \n A --> B\n B --> C)
    let mermaidMarkup = "graph TD";
    parsedDiaMarkup.split("\n").forEach(line => {
      let nodes = line.split("-->");
      for (let i = 0; i < nodes.length - 1; i++) {
        let label1 = nodes[i];
        let label2 = nodes[i + 1];
        mermaidMarkup = mermaidMarkup + "\n" + label1 + " --> " + label2;
      }
    });

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

    // console.log('P:', this.diaParser(this.props.children.toString(), this.diaRules).join(''))
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
