import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import {CardContainer} from './components/cardContainer.js';
import {Header} from './components/header.js';
import CardData from './assets/cardDB.json';
import update from 'immutability-helper';


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeCardColors : ['W','U','B','R','G','N'],
            deckBuild : {},
            collectActive: true,
            currentCardArray: [],
            loadingCollBool:false,
        }
        this.generateCardArray = this.generateCardArray.bind(this);
        this.filterPressed = this.filterPressed.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.generateCollectionArray = this.generateCollectionArray.bind(this);
        this.changeFromDeckToColl = this.changeFromDeckToColl.bind(this);
        this.changeFromCollToDeck = this.changeFromCollToDeck.bind(this);
    }

    componentDidUpdate(){
        console.log("App Update");
    }
    componentDidMount(){
        this.generateCollectionArray();
    }

    generateCardArray(){
        if(this.state.collectActive){
            this.generateCollectionArray();
        }
        else{
            this.generateDeckArray();
        }
    }
    //Generates a card array from cardDB.json while taking into account the activeCardColors
    generateCollectionArray(){
        this.setState({
            loadingCollBool:true
        });
        setTimeout(() => {
            var cardArray = [];
            var stateCards = this.state.activeCardColors;
            for(card in CardData){
                var colorArray = CardData[card]['colors'];
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
                currentCardArray:cardArray,
                loadingCollBool:false,
            });

        }, 0);

    }

    //Makes a card array from the deckBuild state object
    generateDeckArray(){
        var cardArray = [];
        for(card in this.state.deckBuild){
                var pushData = CardData[card];
                cardArray.push(pushData);
        }
        this.setState({
            currentCardArray:cardArray
        });
    }

    //Handles when a filter in the header is pressed, changes the activeCard colors state
    //Triggered in FilterSelector
    //'W','U','B','R','G','N' or 'allOff'
    filterPressed(colorString){
        var oldColorArray = this.state.activeCardColors.slice(0);
        if(oldColorArray.includes(colorString)){
            var index = oldColorArray.indexOf(colorString);
            oldColorArray.splice(index, 1);
        }
        else{
            oldColorArray.push(colorString);

        }
        this.setState({
            activeCardColors:oldColorArray,
            collectActive:true
        });

        this.generateCollectionArray();
    }

    changeFromDeckToColl(){
        if(!this.state.collectActive){
            this.setState({
                collectActive: true
            });
        }
        this.generateCollectionArray();
    }

    changeFromCollToDeck(){
        if(this.state.collectActive){
            this.setState({
                collectActive: false
            });
        }
        this.generateDeckArray();
    }

    //Adding a card to the state object "deckBuild"
    //Triggered in BigCard
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

    removeCard(cardIndex){
        var currentCardArray = this.state.currentCardArray;
        var cardObjectToAdd = currentCardArray[cardIndex];
        var arenaId = cardObjectToAdd["arenaId"];

        if(this.state.deckBuild[arenaId] == 1){
            var newObject = update(this.state.deckBuild,{
                $unset: [arenaId]}
            );
            this.setState({
                deckBuild:newObject
            });
            return true;
        }
        else if(this.state.deckBuild[arenaId] > 1){
            var newObject = update(this.state.deckBuild,{
                [arenaId]:{$apply: function(x){return x-1;}}
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
        var loadingComponent = this.state.loadingCollBool ? <ActivityIndicator size="large" color="green" style={{position:'absolute',zIndex:2}}/> : <View style={{display:'none'}} />;

        return (
            <View style={styles.container}>
                <Header
                    collectActive={this.state.collectActive}
                    deckBuild={this.state.deckBuild}
                    selectDeck={this.changeFromCollToDeck}
                    selectColl={this.changeFromDeckToColl}
                    filterPress={this.filterPressed}
                    activeCards={this.state.activeCardColors}/>

                {loadingComponent}

                <CardContainer style={{flex:1}}
                    collectActive={this.state.collectActive}
                    cardArray={this.state.currentCardArray}
                    deckBuild={this.state.deckBuild}
                    addCard={this.addCard}
                    removeCard={this.removeCard}
                    />
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
