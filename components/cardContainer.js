import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableHighlight } from 'react-native';
import {Card} from './card.js';
import {BigCard} from './bigCard.js';
import CardData from '../assets/cardDB.json'


var cardArray = [];
for(var card in CardData){
    //TEMPFIX
    pushData = CardData[card];
    pushData["arenaId"] = String(card);

    cardArray.push(pushData);
}
export class CardContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeCardName: null,
            activeCardPath : null,
            cardActive: false
        }
        this.handleTouch = this.handleTouch.bind(this);
    }


    handleTouch(cardName,cardPath) {
        const newBoolState = this.state.cardActive == true ? false : true;
        this.setState({
            activeCardName: cardName,
            activeCardPath : cardPath,
            cardActive: newBoolState
        });
    }

    render() {
        if(this.state.cardActive){
            return(
                    <BigCard press={this.handleTouch} reqpath={this.state.activeCardPath}/>
                )
        }
        else{
            return (
                <ScrollView>
                    <View style={styles.cards}>
                        {cardArray.map(data =>
                                <Card reqpath={data["arenaId"]} text={data["name"]} press={this.handleTouch} lrgImg={data["lrg_img_link"]} smlImg={data["sml_img_link"]} key={data["sml_img_link"]} />
                        )}
                    </View>
                </ScrollView>
            );
        }
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
