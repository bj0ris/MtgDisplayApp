import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {CardContainer} from './components/cardContainer.js';
import {Header} from './components/header.js';
import CardData from './assets/cardDB.json'

//'W','U','B','R','G','N'
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeCardColors : ['W','U','B','R','G','N'],
        }
        this.generateCardArray = this.generateCardArray.bind(this);
        this.filterPressed = this.filterPressed.bind(this);
    }

    generateCardArray(){
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
                pushData["arenaId"] = String(card);
                cardArray.push(pushData);
            }

        }
        return cardArray
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
    }

    render() {
        return (
            <View style={styles.container}>
                <Header filterPress={this.filterPressed} />
                <CardContainer style={{flex:1}} cardArray={this.generateCardArray()}/>
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
