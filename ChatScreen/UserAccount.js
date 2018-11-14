import React from "react";
import { AppRegistry, View , StatusBar, StyleSheet } from "react-native";
import stripe from 'tipsi-stripe';
import Nightr from "../app.js";
import JadeChat from './JadeChat.js';
import {oauth, net} from 'react-native-force';
import { TabNavigator, StackNavigator } from "react-navigation";
import { Container, Body, Content, Header, H3, Left, Icon, Right, Title, Input, Button,  Item, Label, Text, ListItem, CheckBox, Picker, Form } from "native-base";
import testID from '../utils/testID'
//import HomeScreen from "../HomeScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 60,
  },
})

export default class UserAccount extends React.Component {

  constructor(props) {
        
    super(props);
    this.state = {
        data: [],
        jsonResponse: [],
        profileName: [],
    };
  }

  componentDidMount() {

    var that = this;

    oauth.getAuthCredentials(
      (responseSF) => that.fetchData(responseSF), // already logged in
      () => {
          oauth.authenticate(
              () => that.fetchData(),
              (error) => console.log('Failed to authenticate:' + error)
          );
      });
}

fetchData(responseSF) {
  var that = this;
  that.setState({jsonResponse: responseSF.userId});
  var userQuery = 'SELECT Id, CreatedDate, FirstName, LastName, Street, City, State, PostalCode, Email from User where Id = '  +  `'` + this.state.jsonResponse + `'`;
  console.log(userQuery);
  net.query(userQuery,
           (responseNew) => that.setState(
           {firstName: responseNew.records[0].FirstName,
            lastName: responseNew.records[0].LastName,
            Street: responseNew.records[0].Street,
            City: responseNew.records[0].City,
            State: responseNew.records[0].State,
            PostalCode: responseNew.records[0].PostalCode, 
            Email: responseNew.records[0].Email, 
          }
          ),
        );
  net.query('SELECT Id, Name, Type__c, Phone__c, Logo__c, Lat_Long__Latitude__s, Lat_Long__Longitude__s, Mixed_Drink_Prices__c, Monday_Closed__c, Monday_Open__c FROM Location__c LIMIT 10',
            (response) => that.setState({data: response.records})
           );
}

  

    static title = 'Card Form'

    state = {
      loading: false,
      token: null,
      idFromJson: null,
    }
  
    handleCardPayPress = async () => {
      try {
        this.setState({ loading: true, token: null })
        const token = await stripe.paymentRequestWithCardForm({
          // Only iOS support this options
          smsAutofillDisabled: true,
          requiredBillingAddressFields: 'full',
          theme: {
            primaryBackgroundColor: '#ffffff', 
            secondaryBackgroundColor: '#ffffff',
            primaryForegroundColor: '#ffffff',
          },
          prefilledInformation: {
            billingAddress: {
              name: 'Gunilla Haugeh',
              line1: 'Canary Place',
              line2: '3',
              city: 'Macon',
              state: 'Georgia',
              country: 'US',
              postalCode: '31217',
              email: 'ghaugeh0@printfriendly.com',
            },
          },
        })
  
        this.setState({ loading: false, token })
      } catch (error) {
        this.setState({ loading: false })
      }
    }

  render() {

    stripe.setOptions({
        publishableKey: 'pk_test_DKpZdAFHJbd1KybJdJU227F5',
        merchantId: 'MERCHANT_ID', // Optional
        androidPayMode: 'test', // Android only
      })

    const { navigate } = this.props.navigation;
    const { loading, token } = this.state
    return (
      <Container>
<Header>
    <Left>
    <Button
              transparent
              onPress={() => navigate('Pass')}>
              <Icon name="arrow-back" />
            </Button>
        </Left>
          <Body>
            <Title>Account Information</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Content padder>

          <Form>
            <Item>
            <Button
          onPress={this.handleCardPayPress}
          text="Enter you card and pay"
          loading={loading}
        
          {...testID('cardFormButton')}
        >
      <Text>Change Card Information</Text> 
        </Button>
              </Item>
              <Item>
              <Text>Get it boy: {this.state.jsonResponse} - {this.state.firstName}</Text>
            </Item>
            <Item floatingLabel>
              <Label>First Name: {this.state.firstName}</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Last Name: {this.state.lastName}</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Address: {this.state.Street}</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>City: {this.state.City}</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>State: {this.state.State}</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Zip Code: {this.state.PostalCode}</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email: {this.state.Email}</Label>
              <Input />
            </Item>
            <Item>
            <Button
          onPress={this.handleCardPayPress}
          text="Enter you card and pay"
          loading={loading}
        
          {...testID('cardFormButton')}
        >
      <Text>Submit Information Change</Text> 
        </Button>
            </Item>
          </Form>

        <Text style={styles.header}>
          Card Form Example
        </Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        
        <View
          style={styles.token}
          {...testID('cardFormToken')}>
          {token &&
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
          }
        </View>
        </Content>
      </Container>
    );
  }
}