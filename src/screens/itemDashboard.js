import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import CreateItemModal from "./createItem";
import { API } from "aws-amplify";
import _ from "lodash";
import EditItemModal from "./editItem.js";

let apiName = "ServerlessReactExampleCRUD";
let path = "/ServerlessReactExample";
class ItemDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { itemData: {} };
  }
  getItems() {
    API.get(apiName, path).then(response => {
      console.log(response);
      this.setState({
        itemData: response.data
      });
    });
  }
  componentDidMount() {
    this.getItems();
  }

  getItem(id) {
    let single_path = "/ServerlessReactExample/" + id;
    console.log(single_path);
    API.get(apiName, single_path).then(response => {
      console.log(response);
      this.setState({
        item: response
      });
    });
  }
  render() {
    const itemData = this.state.itemData;
    return (
      <div>
        <CreateItemModal getItems={this.getItems} />
        <Container style={{ padding: 10 }}>
          <Card.Group>
            {_.map(itemData, ({ ID, ItemName, ItemPrice, ItemDescription }) => (
              <Card onClick={() => this.getItem(ID)}>
                <Card.Content>
                  <Card.Header>{ItemName}</Card.Header>
                  <Card.Meta>£ {ItemPrice}</Card.Meta>
                  <Card.Description>{ItemDescription}</Card.Description>
                </Card.Content>
                <EditItemModal
                  item={Object.values(this.state.item)}
                  getItems={this.getItems}
                />
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}
export default ItemDashboard;
