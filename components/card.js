import React from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import {ImgSmall,ImgLarge} from './rezImg.js'

console.log("test");

export class Card extends React.Component {
    testfunc(){
        console.log("press");
    }
    render() {
        return (

            <View style={styles.card} >
                <Image source={require('../data/img/65971s.jpg')}  style={styles.image} />
            </View>
        );
    }
}
//<Text onPress={this.testfunc}>{this.props.text}</Text>

const styles = StyleSheet.create({
    card: {
        width: 73,
        height:102,
        margin: 15,
        marginTop:0,
        borderWidth: 2,
        borderColor: '#000',
    },
    image: {
        width:73,
        resizeMode: 'contain',
    },

});
