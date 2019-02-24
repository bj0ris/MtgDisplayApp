import React from 'react';
import { StyleSheet, Text, View,Button, TouchableHighlight } from 'react-native';

export class FilterSelector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeBool : true,
        }
        this.touchHandle = this. touchHandle.bind(this);

    }

    touchHandle(){
        this.props.filterPress(this.props.colorTag)
        var newActiveBool = this.state.activeBool ? false : true;
        this.setState({
            activeBool : newActiveBool
        });
    }

    render() {
        if(this.state.activeBool){
            return (
                <TouchableHighlight  onPress={this.touchHandle}>
                    <View style={[styles.filterSelected,{backgroundColor:this.props.color}]}>

                    </View>
                </TouchableHighlight>
            );
        }
        else{
            return (
                <TouchableHighlight  onPress={this.touchHandle}>
                    <View style={[styles.filterNotSelected,{backgroundColor:this.props.color}]}>

                    </View>
                </TouchableHighlight>
            );
        }
    }

}
const styles = StyleSheet.create({

    filterSelected:{
        width: 30,
        height: 30,
        borderWidth:3,
        borderColor:'orange',
        borderRadius:40,
    },
    filterNotSelected:{
        width: 30,
        height: 30,
        borderWidth:1,
        borderColor:'black',
        borderRadius:40,
    }
});
