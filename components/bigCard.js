import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableHighlight } from 'react-native';
import Images from '../assets/imgIndex.js';

export class BigCard extends React.Component {
    constructor(props) {
        super(props);
        this.cardPressed = this.cardPressed.bind(this);
    }

    cardPressed(){
        this.props.press(this.props.text);
    }

    render() {
        var path = Images.l[this.props.reqpath];
        //console.log(typeof this.props.reqpath);
        //console.log(this.props.reqpath);
        //console.log(path);
        return (

            <TouchableHighlight onPress={this.cardPressed} style={styles.image}>
                <Image source={path}  style={styles.image}/>
            </TouchableHighlight>

        );
    }
}



const styles = StyleSheet.create({
    card: {
        marginTop:0,
    },
    image: {
        width:"100%",
        position:'absolute',
        bottom:0,
        top:0,

    },

});
