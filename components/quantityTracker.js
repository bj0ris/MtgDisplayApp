import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableHighlight } from 'react-native';

export class QuantityTracker extends React.Component {
    constructor(props){
        super(props);

    }




    render(){
        return(
            <View style={styles.container}>
                <View style={[this.props.quantity>= 1 ? styles.ownedDiamond  : styles.basicDiamond,{transform: [{rotateZ: '45deg' }] }]} />
                <View style={[this.props.quantity>= 2 ? styles.ownedDiamond  : styles.basicDiamond,{transform: [{rotateZ: '45deg' }] }]} />
                <View style={[this.props.quantity>= 3 ? styles.ownedDiamond  : styles.basicDiamond,{transform: [{rotateZ: '45deg' }] }]} />
                <View style={[this.props.quantity>= 4 ? styles.ownedDiamond  : styles.basicDiamond,{transform: [{rotateZ: '45deg' }] }]} />
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
        borderWidth: 2,
        borderColor: 'yellow',
        backgroundColor:'grey',
        opacity:0.5
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
        backgroundColor:'orange',
        borderWidth:1,
        borderColor:'orange',
    },
    inDeckDiamond:{
        width:'10%',
        aspectRatio: 1,
        backgroundColor:'black',
        borderWidth:1,
        borderColor:'black',
    }
});
