import React from 'react';
import { StyleSheet, Text, View,Button ,TouchableHighlight} from 'react-native';

export class DeckBar extends React.Component {

    shouldComponentUpdate(nextProps,nextState){
        if(this.props.maxNum === nextProps.maxNum && this.props.cardNumArray === nextProps.cardNumArray){
            return false;
        }
        else{
            return true;
        }
    }

    componentDidUpdate(){
        console.log("Bar    Update");
    }

    calculateCreaturePercentage(){
        var max = this.props.maxNum;
        var creatures = this.props.cardNumArray[0];
        return (parseFloat(creatures)/max*100);
    }

    calculateTotPercentage(){
        var max = this.props.maxNum;
        var thisTot = this.props.cardNumArray[1];
        return parseFloat(thisTot)/max*100
    }

    render(){
        var creaturesHeight = this.calculateCreaturePercentage();
        var ncHeightPercent = (this.calculateTotPercentage()-creaturesHeight)+"%";
        var creaturesHeightPercent = creaturesHeight+"%";
        return(
            <View style={styles.outerBar}>
                <View style={[styles.ncBar,{height:ncHeightPercent}]} />
                <View style={[styles.creatureBar,{height:creaturesHeight}]} />
            </View>
        );
    }
}
const styles = StyleSheet.create({

    outerBar: {
        width:20,
        height:'100%',
        backgroundColor:'black',
        borderWidth:1,
        borderColor:'orange',
        justifyContent:'flex-end',
    },
    creatureBar:{
        backgroundColor:'orange'
    },
    ncBar:{
        backgroundColor:'lightblue'
    }

});
