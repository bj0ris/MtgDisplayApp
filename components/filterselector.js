import React from 'react';
import { StyleSheet, Text, View,Button, TouchableHighlight, Image } from 'react-native';

export class FilterSelector extends React.Component {
    constructor(props){
        super(props);
        this.touchHandle = this. touchHandle.bind(this);

    }
    //Add Vibration ?
    touchHandle(){
        this.props.filterPress(this.props.colorTag);
    }

    render() {
        var colorDict = {
            'W':require('../assets/divImg/W.png'),
            'U':require('../assets/divImg/U.png'),
            'B':require('../assets/divImg/B.png'),
            'R':require('../assets/divImg/R.png'),
            'G':require('../assets/divImg/G.png'),
            'N':require('../assets/divImg/N.png'),
            'allOff':require('../assets/divImg/dim1.png')
        };
        var path = colorDict[this.props.colorTag];
        if(this.props.active){
            return (
                <TouchableHighlight  onPress={this.touchHandle}>
                    <View style={[styles.filterSelected,{backgroundColor:this.props.color}]}>
                        <Image source={path} resizeMode='contain' style={styles.image}/>
                    </View>
                </TouchableHighlight>
            );
        }
        else{
            return (
                <TouchableHighlight  onPress={this.touchHandle}>
                    <View style={[styles.filterNotSelected]}>
                        <Image source={path} resizeMode='contain' style={styles.image}/>
                    </View>
                </TouchableHighlight>
            );
        }
    }

}
//{backgroundColor:this.props.color}
const styles = StyleSheet.create({

    filterSelected:{
        width: 30,
        height: 30,
        borderRadius:30,
    },
    filterNotSelected:{
        width: 30,
        height: 30,
        borderRadius:30,
        opacity:0.3,
    },
    image :{
        borderRadius:30
    }
});
