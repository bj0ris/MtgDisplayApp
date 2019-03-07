import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableHighlight } from 'react-native';

export class QuantityTracker extends React.Component {
    constructor(props){
        super(props);
        this.findStyle = this.findStyle.bind(this);

    }
    componentWillReceiveProps(nextProps){
    }

    findStyle(num){
        var deckQuant = this.props.deckQuant;
        var collQuant = this.props.quantity;

        if(collQuant>=num){
            if( Math.abs(collQuant-deckQuant) <= num-1){
                return styles.inDeckDiamond;
            }
            else if(collQuant>=num){
                return styles.ownedDiamond;
            }
        }
        else{
            return styles.basicDiamond
        }
    }


    render(){

        return(
            <View style={styles.container}>
                <View style={[this.findStyle(1),{transform: [{rotateZ: '45deg' }] }]} />
                <View style={[this.findStyle(2),{transform: [{rotateZ: '45deg' }] }]} />
                <View style={[this.findStyle(3),{transform: [{rotateZ: '45deg' }] }]} />
                <View style={[this.findStyle(4),{transform: [{rotateZ: '45deg' }] }]} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width:'60%',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
        borderColor: 'yellow',
        backgroundColor:'grey',

        position:'absolute',
        top:0,
    },
    basicDiamond:{
        width:'10%',
        aspectRatio: 1,
        backgroundColor:'black',
        borderWidth:1,
        borderColor:'black',
    },

    ownedDiamond:{
        width:'10%',
        aspectRatio: 1,
        borderWidth:2,
        backgroundColor:'yellow',
        borderColor:'orange',
    },
    inDeckDiamond:{
        width:'10%',
        aspectRatio: 1,
        backgroundColor:'black',
        borderWidth:3,
        borderColor:'red',
    }
});
