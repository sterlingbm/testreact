import React, { Component } from "react";
import LucyChat from "./LucyChat.js";
import JadeChat from "./JadeChat.js";
import MapFilters from "./MapFilters.js";
import UserAccount from "./UserAccount.js";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

const HomeStack = StackNavigator({
  Home: { screen: LucyChat},
  MapFilters: { screen: MapFilters },
}, 
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }

);

const SettingsStack = StackNavigator({
  Pass: { screen: JadeChat },
  UserAccount: { screen: UserAccount }
},

{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }

);

export default (MainScreenNavigator = TabNavigator(


  
  {
    LucyChat: { screen: HomeStack },
    JadeChat: { screen: SettingsStack },
  },
  {


    
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("LucyChat")}>
              <Icon name="pin" />
              <Text>Map</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("JadeChat")}>
              <Icon name="barcode" />
              <Text>Pass</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
));