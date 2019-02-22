import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {CardContainer} from './components/cardContainer.js';


export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.filter}>
                    <Text>Filter + options går her</Text>
                </View>
                <CardContainer style={{flex:1}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#000',
  },
    filter: {
        height: 150,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    cards: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#000',
        display: "flex",
        flexWrap: "wrap",
    },

});
