import React from 'react';
import { StyleSheet, Text, View,Button ,TouchableHighlight} from 'react-native';
import {DeckBar} from './deckBar.js';
import CardData from '../assets/cardDB.json';

export class DeckBalance extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            HighestNumOfCards: 0,
            oneManaCards : [0,0],
            twoManaCards : [0,0],
            threeManaCards : [0,0],
            fourManaCards : [0,0],
            fiveManaCards : [0,0],
            sixUpManaCards : [0,0],

        }
        this.isTypeCreature = this.isTypeCreature.bind(this);
        this.getDeckComposition = this.getDeckComposition.bind(this);
    }
    componentWillReceiveProps(nextProps){
        console.log("DB     Recieving Props");
        this.setState({
            HighestNumOfCards: 0,
            oneManaCards : [0,0],
            twoManaCards : [0,0],
            threeManaCards : [0,0],
            fourManaCards : [0,0],
            fiveManaCards : [0,0],
            sixUpManaCards : [0,0],
        });
        this.getDeckComposition(this.generateDeckArray());
    }
    componentDidUpdate(){
        console.log("DB     Update");
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log("DB     trying update");
        /*
        NEED BETTER OBJECT COMPARE?
        if(this.props.deckBuild == nextProps.deckBuild){
            return false;
        }
        */
        return true
    }
    generateDeckArray(){
        var cardArray = [];
        for(var card in this.props.deckBuild){
                var pushData = CardData[card];
                pushData["arenaId"] = String(card);
                pushData["deckQuant"] = this.props.deckBuild[String(card)];
                cardArray.push(pushData);
        }
        return cardArray
    }

    isTypeCreature(cardObject){
        var typeString = cardObject["type"];
        if(typeString.substring(0,8) == "Creature"){
            return true;
        }
        else{
            return false;
        }
    }
    amountOfCardTypeInDeck(cardObject){
        return cardObject["deckQuant"];
    }
    manaCostOfCardType(cardObject){
        return cardObject["converted_mana_cost"];
    }

    //Create a two dimentional array for each mana cost. 2nd dim is [CreatureAmount,amountTotal]
    getDeckComposition(cardArray){
        var oneManaCards = [0,0]
        var twoManaCards = [0,0]
        var threeManaCards = [0,0]
        var fourManaCards = [0,0]
        var fiveManaCards = [0,0]
        var sixUpManaCards = [0,0]
        var longest = 0;
        for(card in cardArray){
            var cardObject = cardArray[card]
            var manaCost = this.manaCostOfCardType(cardObject);
            var creature = this.isTypeCreature(cardObject);
            var amount = this.amountOfCardTypeInDeck(cardObject);
            switch (manaCost) {
                case 1:
                    if(creature){
                        oneManaCards[0]+=amount;
                    }
                    oneManaCards[1]+=amount;
                    if(oneManaCards[1]>longest){longest = oneManaCards[1];}
                    break;
                case 2:
                    if(creature){
                        twoManaCards[0]+=amount;
                    }
                    twoManaCards[1]+=amount;
                    if(twoManaCards[1]>longest){longest = twoManaCards[1]};
                    break;
                case 3:
                    if(creature){
                        threeManaCards[0]+=amount;
                    }
                    threeManaCards[1]+=amount;
                    if(threeManaCards[1]>longest){longest = threeManaCards[1]};
                    break;
                case 4:
                    if(creature){
                        fourManaCards[0]+=amount;
                    }
                    fourManaCards[1]+=amount;
                    if(fourManaCards[1]>longest){longest = fourManaCards[1]};
                    break;
                case 5:
                    if(creature){
                        fiveManaCards[0]+=amount;
                    }
                    fiveManaCards[1]+=amount;
                    if(fiveManaCards[1]>longest){longest = fiveManaCards[1]};
                    break;
                default:
                    if(creature){
                        sixUpManaCards[0]+=amount;
                    }
                    sixUpManaCards[1]+=amount;
                    if(sixUpManaCards[1]>longest){longest = sixUpManaCards[1]};
                    break;

            }
        }
        this.setState({
            HighestNumOfCards:longest,
            oneManaCards: oneManaCards,
            twoManaCards: twoManaCards,
            threeManaCards: threeManaCards,
            fourManaCards: fourManaCards,
            fiveManaCards: fiveManaCards,
            sixUpManaCards: sixUpManaCards,
        });
    }

    render(){

        return(
            <View style={styles.container}>
                <DeckBar maxNum={this.state.HighestNumOfCards} cardNumArray={this.state.oneManaCards}/>
                <DeckBar maxNum={this.state.HighestNumOfCards} cardNumArray={this.state.twoManaCards}/>
                <DeckBar maxNum={this.state.HighestNumOfCards} cardNumArray={this.state.threeManaCards}/>
                <DeckBar maxNum={this.state.HighestNumOfCards} cardNumArray={this.state.fourManaCards}/>
                <DeckBar maxNum={this.state.HighestNumOfCards} cardNumArray={this.state.fiveManaCards}/>
                <DeckBar maxNum={this.state.HighestNumOfCards} cardNumArray={this.state.sixUpManaCards}/>
            </View>

        );
    }
}


const styles = StyleSheet.create({

    container: {
        width:200,
        height:100,
        backgroundColor:'green',
        flexDirection:'row',
        justifyContent:'space-evenly',
    },

});
