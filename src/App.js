import React, { Component } from "react";
import "./App.css";

import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

import ItemDashboard from "./screens/itemDashboard";
import { Segment, Menu, Icon } from "semantic-ui-react";

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <Segment>
        <Menu>
          <Menu.Item name="home">
            <Icon name="shop" />
          </Menu.Item>
          <Menu.Item name="Items" />
          <Menu.Item name="aboutUs" />
        </Menu>
        <ItemDashboard />
      </Segment>
    );
  }
}

export default App;
