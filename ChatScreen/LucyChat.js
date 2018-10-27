import React from "react";
import { Logo } from "../assets/logo.png";
import {
    StyleSheet,
    View,
    FlatList,
    Component,
    Image,
    AppRegistry,
    StatusBar,
    Dimensions,
} from 'react-native';
import MapFilters from "./MapFilters.js";
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";
//import HomeScreen from "../HomeScreen";

import {oauth, net} from 'react-native-force';

import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height



const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      map: {
        flex: 1,
        height: height,
        width: width
      }
  });



export default class LucyChat extends React.Component {

    constructor(props) {
      
        super(props);
        this.props.navigation.setParams({mapFilterRange: '50'});
        console.log(props.navigation.state.params);
        console.log(this.props.navigation.state);
        console.log(this.props);
        console.log(this.props.navigation.getParam('mapFilterRange', 'fuckmyass'));
        this.state = {
            data: [],
            isMapReady: false,
            latitude: null,
            longitude: null,
            error: null,
            coords:[],    
            mapFilterRange: this.props.navigation.getParam('mapFilterRange', 'fuckmyass'),
        };
       

    }

    componentDidMount() {

        

        var that = this;
       
        navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("wokeeey");
              console.log(position);
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0462,
                longitudeDelta: 0.0261,
                },
              });

              oauth.getAuthCredentials(
                () => that.fetchData(), // already logged in
                () => {
                    oauth.authenticate(
                        () => that.fetchData(),
                        (error) => console.log('Failed to authenticate:' + error)
                    );
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
          );

        

    }

    fetchData() {
        var that = this;
        var mapMarkerQuery = 'SELECT Id, Name, Type__c, Phone__c, Logo__c, Lat_Long__c, Lat_Long__Latitude__s, Lat_Long__Longitude__s, Mixed_Drink_Prices__c, Monday_Closed__c, Monday_Open__c FROM Location__c WHERE DISTANCE(Lat_Long__c, GEOLOCATION(' + that.state.latitude + ',' + that.state.longitude + '),' +  `'` + 'mi' + `') <` + that.state.mapFilterRange;
        console.log(mapMarkerQuery);
        net.query(mapMarkerQuery,
                  (response) => that.setState({data: response.records})
                 );
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Body>
          <Title>
            <Image style={{width: 250, height: 74, resizeMode: 'contain', alignSelf: 'center'}} source={require('../assets/logo.png')}/>
          </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => navigate("MapFilters")}>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Content>
        <MapView
          
          style={ styles.map }
          region={this.state.region}
        >

        

      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}

        {
          this.state.data.map(marker => {
              return (
                  <Marker
                      onPress={() =>
                          this.props.navigation.navigate("LocationDetails", { markerPass: marker })
                      }
                      coordinate={{
                          latitude: marker.Lat_Long__Latitude__s,
                          longitude: marker.Lat_Long__Longitude__s
                      }}
                      title={marker.Name}
                      description="hello"
                  />
                  

              );
          })
          }

        </MapView>
        </Content>
      </Container>
    );
  }
}