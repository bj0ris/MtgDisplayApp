import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';

//Small img = 146 x 204
//Larg img = 488 x 680

export class ImgSmall extends React.Component {
    render() {
        return (

            <View style={styles.card}>
                <Image source={require('../data/img/65971s.jpg')} style={styles.image} />
            </View>
        );
    }
}

export class ImgLarge extends React.Component {
    render() {
        return (

            <View style={styles.card}>
                <Image source={require('../data/img/65971s.jpg')} style={styles.image} />
            </View>
        );
    }
}
