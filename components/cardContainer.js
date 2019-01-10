import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import {Card} from './card.js';
import CardData from '../data/cardDB.json'
//TODO
var tester = [];
for(var card in CardData){
    tester.push(CardData[card]);
}
export class CardContainer extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.cards}>
                    {tester.map(data =><Card text={data["name"]} lrgImg={data["lrg_img_link"]} smlImg={data["sml_img_link"]} key={data["name"]} />)}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cards: {
        flex: 1,
        alignSelf: 'stretch',
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 2,
        borderColor: '#000',
    },

});
