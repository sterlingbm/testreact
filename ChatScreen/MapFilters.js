import React from "react";
import { AppRegistry, View, StatusBar } from "react-native";
import LucyChat from "./LucyChat.js";
import Nightr from "../app.js";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Container, Body, Content, Header, H3, Left, Icon, Right, Title, Input, Item, Label, Button, Text, ListItem, CheckBox, Picker, Form } from "native-base";
//import HomeScreen from "../HomeScreen";



export default class MapFilters extends React.Component {

  



    constructor(props) {
        super(props);
        

        this.state = {
          mapFilterRange: 10000,
          passFromLucy: this.props.navigation.getParam('passToFilters', 'fuckmyass')
        };

        
      }
      onValueChange(value: string) {
        this.setState({
          mapFilterRange: value
        });
      }


  render() {

console.log(this.state.passFromLucy);

    const { navigate } = this.props.navigation;
    return (
      <Container>
<Header>
    <Left>
    <Button
              transparent
              onPress={() => {
              this.props.navigation.state.params.onNavigateBack(this.state.mapFilterRange);
              navigate('Home', {
                passMap: this.state.mapFilterRange,
                });
                }}>
              <Icon name="arrow-back" />
            </Button>
        </Left>
          <Body>
            <Title>Map Filters{this.state.mapFilterRange}</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Content padder>
        <Form>
        <H3>Location Type:</H3>
        <ListItem>
            <CheckBox checked={true} />
            <Body>
              <Text>Daily Stand Up</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Discussion with Client</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} color="green"/>
            <Body>
              <Text>Finish list Screen</Text>
            </Body>
          </ListItem>
        <H3>Location Distance:</H3>
        <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.mapFilterRange}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="10 Miles" value="10" />            
              <Picker.Item label="25 Miles" value="25" />
              <Picker.Item label="50 Miles" value="50" />
              <Picker.Item label="75 Miles" value="75" />
              <Picker.Item label="100 Miles" value="100" />
              <Picker.Item label="200 Miles" value="200" />
            </Picker>
            <Button block>
            <Text>Update Map</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}