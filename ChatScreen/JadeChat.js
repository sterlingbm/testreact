import React from "react";
import { AppRegistry, View, StatusBar, StyleSheet,  TextInput } from "react-native";
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text} from "native-base";
import QRCode from 'react-native-qrcode';
//import HomeScreen from "../HomeScreen";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
},
    
  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      borderRadius: 5,
      padding: 5,
  }
});

export default class JadeChat extends React.Component {

  

  state = {
    text: 'http://facebook.github.io/react-native/',
  };

  

  render() {

   

    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Nightr Pass</Title>
          </Body>
          <Right>

          <Button iconLeft bordered light onPress={() => navigate("UserAccount")}>
            <Icon name='person'/>
            <Text>Account</Text>
          </Button>
          </Right>
        </Header>
        <Content padder>
        <QRCode
          style={{alignSelf: 'center'}}
          value={this.state.text}
          size={200}
          bgColor='#fff'
          fgColor='#000'/>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('JadeChat', () => JadeChat);
 
module.exports = JadeChat;