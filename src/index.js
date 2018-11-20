import React from "react";
import { render } from "react-dom";
import { keys } from "lodash";
import { Col, Row, Radio } from "antd";
import Highlight from "react-highlight";
import Autolinker from "autolinker";
import FakeData from "./fakeData";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const CodeThemesMapper = {
  "monokai-sublime":
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/monokai-sublime.min.css",
  "solarized-light":
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/solarized-light.min.css",
  "solarized-dark":
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/solarized-dark.min.css"
};

const getRandomTheme = () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const CodeThemesMapperKeys = keys(CodeThemesMapper);
  return keys(CodeThemesMapper)[getRandomInt(0, CodeThemesMapperKeys.length)];
};

class App extends React.Component {
  state = {
    codeString: FakeData,
    themeName: getRandomTheme(),
    loading: false
  };

  changeTheme = e => {
    this.setState({
      themeName: e.target.value
    });
  };

  codeStringFormatter = codeString => {
    const formatCodeString = JSON.stringify(codeString, null, 4);
    return Autolinker.link(formatCodeString, {
      stripTrailingSlash: false,
      stripPrefix: false
    });
  };

  render() {
    const { codeString, themeName } = this.state;
    return (
      <div className="cont">
        <link
          id="code-theme"
          rel="stylesheet"
          type="text/css"
          href={CodeThemesMapper[themeName]}
        />
        <Row>
          <Col>
            <div className="code-cont">
              <div className="theme-radio-group">
                <span className="theme-label">主题色：</span>
                <RadioGroup
                  onChange={this.changeTheme}
                  value={themeName}
                  size="small"
                >
                  {keys(CodeThemesMapper).map(itemName => {
                    return (
                      <RadioButton
                        className={"theme-radio " + itemName}
                        key={itemName}
                        value={itemName}
                      >
                        {itemName}
                      </RadioButton>
                    );
                  })}
                </RadioGroup>
              </div>
              <Highlight language="json">
                <Highlight innerHTML={true}>
                  {this.codeStringFormatter(codeString)}
                </Highlight>
              </Highlight>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
