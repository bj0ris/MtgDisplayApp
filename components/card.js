import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableHighlight } from 'react-native';
import Images from '../assets/imgIndex.js';
//import {ImgSmall,ImgLarge} from './rezImg.js'



export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.cardPressed = this.cardPressed.bind(this);
    }
    componentDidUpdate(){
        console.log("card     Update");
    }

    shouldComponentUpdate (nextProps, nextState){
        if((nextProps.activeCardIndex == this.props.index)||(Math.abs(nextProps.activeCardIndex-this.props.index)==1) )  {
            return true;
        }
        return false
    }

    cardPressed(){
        this.props.press( this.props.reqpath, this.props.index);
    }

    render() {
        // test = Images.s.s68286;
        //console.log(this.props.index);
        var path = Images.s[this.props.reqpath];
            if(this.props.index === this.props.activeCardIndex){
                return (
                    <TouchableHighlight onPress={this.cardPressed}>
                        <View style={styles.cardActive} >
                            <Image source={path}  style={styles.image} />
                        </View>
                    </TouchableHighlight>
                );
            }
            else{
                return (
                    <TouchableHighlight onPress={this.cardPressed}>
                        <View style={styles.card} >
                            <Image source={path}  style={styles.image} />
                        </View>
                    </TouchableHighlight>
                );
            }
        }

}
//this.props.smlImggfhjnjklb
//source={require('../assets/img/65971s.jpg')}
//<Text onPress={this.testfunc}>{this.props.text}</Text>
//Somethingfgh
const styles = StyleSheet.create({
    card: {
        width: 73,
        height:102,
        margin: 15,
        marginTop:0,
        borderWidth: 2,
        borderColor: '#000',
    },
    cardActive: {
        width: 73,
        height:102,
        margin: 15,
        marginTop:0,
        borderWidth: 2,
        borderColor: '#f1802d',
    },
    image: {
        position: 'absolute',
        top: -51,
        width:73,
        resizeMode: 'contain',
        borderRadius: 4,
    },

});
