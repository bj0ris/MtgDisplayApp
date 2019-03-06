import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {CardContainer} from './components/cardContainer.js';
import {Header} from './components/header.js';
import CardData from './assets/cardDB.json';
import update from 'immutability-helper';

//'W','U','B','R','G','N'
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeCardColors : ['W','U','B','R','G','N'],
            deckBuild : {},
            libActive: true,
            currentCardArray: [],
        }
        this.generateCardArray = this.generateCardArray.bind(this);
        this.filterPressed = this.filterPressed.bind(this);
        this.addCard = this.addCard.bind(this);
        this.generateLibraryArray = this.generateLibraryArray.bind(this);
        this.changeFromDeckToLib = this.changeFromDeckToLib.bind(this);
        this.changeFromLibToDeck = this.changeFromLibToDeck.bind(this);
    }

    componentDidUpdate(){
        console.log("App Update");
    }
    componentDidMount(){
        this.generateLibraryArray();
    }

    generateCardArray(){
        console.log("Generating Cards!!!!!!!!!!!!!!!");
        if(this.state.libActive){
            this.generateLibraryArray();
        }
        else{
            this.generateDeckArray();
        }
    }
    generateLibraryArray(){
        var cardArray = [];
        var stateCards = this.state.activeCardColors;
        for(var card in CardData){
            var colorArray = CardData[card]['colors'];;
            if(colorArray[0] == undefined){
                colorArray = ['N'];
            }

            var containsBool = false;
            for(var i=0; i<colorArray.length;i++){
                if(stateCards.includes(colorArray[i])){
                    containsBool=true;
                    break;
                }
            }

            if(containsBool) {
                var pushData = CardData[card];
                //Inserts arenaId in self
                pushData["arenaId"] = String(card);

                cardArray.push(pushData);
            }

        }
        this.setState({
            currentCardArray:cardArray
        });
    }

    generateDeckArray(){
        var cardArray = [];
        console.log("Building new deck");
        for(card in this.state.deckBuild){
                var pushData = CardData[card];
                cardArray.push(pushData);
        }
        this.setState({
            currentCardArray:cardArray
        });
    }
    //'W','U','B','R','G','N' or 'allOff'
    filterPressed(colorString){
        if(colorString== 'allOff'){
            this.setState({
                activeCardColors:[]
            });
        }
        else{
            var oldColorArray = this.state.activeCardColors;
            if(oldColorArray.includes(colorString)){
                var index = oldColorArray.indexOf(colorString);
                oldColorArray.splice(index, 1);
                this.setState({
                    activeCardColors:oldColorArray
                });
            }
            else{
                oldColorArray.push(colorString);
                this.setState({
                    activeCardColors:oldColorArray
                });
            }
        }
        this.generateCardArray();
    }

    changeFromDeckToLib(){
        if(!this.state.libActive){
            this.setState({
                libActive: true
            });
        }
        this.generateCardArray();
    }
    changeFromLibToDeck(){
        if(this.state.libActive){
            this.setState({
                libActive: false
            });
        }
        this.generateCardArray();
    }
    /*"arenaId": "66079",
[15:00:32]   "colors": Array [
[15:00:32]     "U",
[15:00:32]   ],
[15:00:32]   "converted_mana_cost": 4,
[15:00:32]   "dateAdded": "2019-01-10",
[15:00:32]   "lrg_img_link": "img/66079l.jpg",
[15:00:32]   "mana_cost": "{3}{U}",
[15:00:32]   "name": "Herald of Secret Streams",
[15:00:32]   "power": "2",
[15:00:32]   "quantity": 1,
[15:00:32]   "rarity": "rare",
[15:00:32]   "sml_img_link": "img/66079s.jpg",
[15:00:32]   "toughness": "3",
[15:00:32]   "type": "Creature — Merfolk Warrior"
    */
    //Using immutability-helper to prevent changing state.deckBuild outside setState
    addCard(cardIndex){
        var currentCardArray = this.state.currentCardArray;
        var cardObjectToAdd = currentCardArray[cardIndex];
        var arenaId = cardObjectToAdd["arenaId"];

        if(this.state.deckBuild[arenaId] == undefined){
            var newObject = update(this.state.deckBuild,{
                $merge: {[arenaId]:1}
            });
            this.setState({
                deckBuild:newObject
            });
            return true;
        }
        else if(this.state.deckBuild[arenaId] < cardObjectToAdd['quantity']){
            var newObject = update(this.state.deckBuild,{
                [arenaId]:{$apply: function(x){return x+1;}}
            });
            this.setState({
                deckBuild:newObject
            });
            return true;
        }
        else{
            return false;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    deckBuild={this.state.deckBuild}
                    selectDeck={this.changeFromLibToDeck}
                    selectLib={this.changeFromDeckToLib}
                    filterPress={this.filterPressed}
                    activeCards={this.state.activeCardColors}/>
                <CardContainer style={{flex:1}}
                    cardArray={this.state.currentCardArray}
                    deckBuild={this.state.deckBuild}
                    addCard={this.addCard}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#000',
  },
    filter: {
        height: 150,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    cards: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#000',
        display: "flex",
        flexWrap: "wrap",
    },

});
