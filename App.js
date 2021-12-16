
import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daftarKaryawan: [
        { id: 1, nama: 'Firmansyah', dept: 'MIS', coordinate: { latitude: -6.2584353, longitude: 106.7900645 } },
        { id: 2, nama: 'Abdul Rohman', dept: 'Accounting', coordinate: { latitude: -6.2599049, longitude: 106.7892339 } },
        { id: 3, nama: 'Genza Vernando', dept: 'MIS', coordinate: { latitude: -6.2599916, longitude: 106.789048 } },
        { id: 4, nama: 'Saiful Huda', dept: 'MIS', coordinate: { latitude: -6.260052, longitude: 106.789016 } },
      ]
    };
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
            latitudeDelta: 0.01,
            longitudeDelta: 0.0010,
          }}
        >
          {this.state.daftarKaryawan.map((item, index) =>

            <Marker
              key={item.id}
              coordinate={item.coordinate}
              title={item.nama}
              description={item.dept}
            />
          )
          }

        </MapView>
      </View>
    );
  }
}

export default App;
