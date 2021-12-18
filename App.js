
import React, { Component } from 'react';
import { View, Text, StatusBar, PermissionsAndroid, FlatList, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Circle, Polygon } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {
        "coords": {
          "accuracy": 0,
          "altitude": 0,
          "heading": 0,
          "latitude": 0,
          "longitude": 0,
          "speed": 0
        },
        "mocked": false,
        "timestamp": 0
      },
      distance: 100,
      nearbyLocation: [],
      daftarKaryawan: [
        { id: 1, nama: 'Firmansyah', dept: 'MIS', coordinate: { latitude: -6.2584353, longitude: 106.7900645 }, 'color': '#3f51b5' },
        { id: 2, nama: 'Abdul Rohman', dept: 'Accounting', coordinate: { latitude: -6.2599049, longitude: 106.7892339 }, 'color': '#4caf50' },
        { id: 3, nama: 'Genza Vernando', dept: 'MIS', coordinate: { latitude: -6.256547812279216, longitude: 106.78652228041605 }, 'color': '#ffeb3b' },
        { id: 4, nama: 'Saiful Huda', dept: 'MIS', coordinate: { latitude: -6.260052, longitude: 106.789016 }, 'color': '#795548' },
      ]
    };
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Ijinkan aplikasi mengakses lokasi?",
          message:
            "Tes akses lokasi",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Dijinkan");
        Geolocation.getCurrentPosition(info => this.setState({ userLocation: info }));
      } else {
        console.log("Tidak diijinkan!");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentDidMount() {
    this.requestLocationPermission();
    this.getNearby();

  }

  getNearby = () => {
    let lokasi = this.state.daftarKaryawan;
    let distance = 0;
    let nearbyLocation = [];
    for (let i = 0; i < lokasi.length; i++) {
      distance = getDistance(
        { latitude: -6.2584353, longitude: 106.7900645 },
        { latitude: lokasi[i].coordinate.latitude, longitude: lokasi[i].coordinate.longitude },
        0.001,
      )

      if (distance < parseFloat(this.state.distance)) {
        nearbyLocation.push(lokasi[i]);
      }


    }
    console.log(nearbyLocation);
    this.setState({ nearbyLocation })
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" hidden translucent />
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{ flex: 1 }}
          region={{
            latitude: -6.2584353,
            longitude: 106.7900645,
            latitudeDelta: 0.03,
            longitudeDelta: 0.0020,
          }}
        >

          <Polygon
            coordinates={[
              {
                latitude: this.state.userLocation.coords.latitude,
                longitude: this.state.userLocation.coords.longitude
              },
              { latitude: -6.260052, longitude: 106.789016 },
              { latitude: -6.256547812279216, longitude: 106.78652228041605 },
            ]}
            strokeWidth={2}
            strokeColor='#3f51b5'
          />

          <Circle
            center={{
              latitude: this.state.userLocation.coords.latitude,
              longitude: this.state.userLocation.coords.longitude
            }}
            radius={100}
            strokeColor='crimson'
            strokeWidth={2}
          />

          {/* <Polyline
            coordinates={[
              {
                latitude: this.state.userLocation.coords.latitude,
                longitude: this.state.userLocation.coords.longitude
              },
              { latitude: -6.260052, longitude: 106.789016 },
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider

            strokeWidth={6}
          />

          <Polyline
            coordinates={[
              {
                latitude: this.state.userLocation.coords.latitude,
                longitude: this.state.userLocation.coords.longitude
              },
              { latitude: -6.256547812279216, longitude: 106.78652228041605 },
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider

            strokeWidth={6}
          /> */}

          {/* lokasi saya */}
          <Marker
            key={'ALI GANTENG'}
            pinColor={'#f44336'}
            coordinate={
              {
                latitude: this.state.userLocation.coords.latitude,
                longitude: this.state.userLocation.coords.longitude
              }
            }
            title={'lokasi saya'}
            description={'lokasi saya saat ini'}
          />
          {/* end lokasi saya */}
          {this.state.daftarKaryawan.map((item, index) =>

            <Marker
              key={item.id}
              pinColor={item.color}
              coordinate={item.coordinate}
              title={item.nama}
              description={item.dept}
            />
          )
          }

        </MapView>
        <TextInput
          value={this.state.distance.toString()}
          onChangeText={(text) => this.setState({ distance: text }, () => this.getNearby())}
          style={{ backgroundColor: '#212121', color: '#ffffff' }}
          placeholder={this.state.distance.toString()}
        />
        <FlatList
          data={this.state.nearbyLocation}
          renderItem={({ item, index }) =>
            <Text>
              {item.nama}
              {item.dept}
            </Text>
          }
        />
      </View>
    );
  }
}

export default App;
