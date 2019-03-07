import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {DeckBalance} from './deckBalance.js';
import {CardCounter} from './cardCounter.js';


export class DeckBox extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <DeckBalance deckBuild={this.props.deckBuild}/>
                <CardCounter headerExtended={this.props.headerExtended} deckBuild={this.props.deckBuild}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center'
    }
});
