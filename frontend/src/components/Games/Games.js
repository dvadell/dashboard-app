import React, { Component } from "react";
import Random from "./Random";
import EvaluateYourDay from "./EvaluateYourDay";

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameChosen: "",
      gamesList: [
        {
          name: "random",
          shortDescription: "Random Everything!",
          longDescription:
            "Read, watch or listen to something random in the internet",
          component: Random
        },
        {
          name: "evaluateYourDay",
          shortDescription: "Evaluate your day",
          longDescription: "Think about what you did and where you are going",
          component: EvaluateYourDay
        }
      ]
    };
  }

  render() {
    const TagName = this.state.gameChosen;
    return (
      <div>
        {this.state.gamesList.map(game => (
          <button
            onClick={() => {
              console.log(game.component);
              this.setState({ gameChosen: game.component });
            }}
          >
            {game.shortDescription}
          </button>
        ))}

        {this.state.gameChosen && (
          <div>
            <hr />
            <TagName />
          </div>
        )}
      </div>
    );
  }
}

export default Games;
