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
////sssdfghj
export class CardContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeCardPath : null,
            cardActive: false,
            cardIndex: null,
        }
        this.handleTouch = this.handleTouch.bind(this);
        this.handleRight = this.handleRight.bind(this);
        this.handleLeft = this.handleLeft.bind(this);
    }
    componentDidUpdate(){
        console.log("containerUpdate");

    }
    shouldComponentUpdate (){
        return true;
    }
    handleRight(index){
        console.log(index);
        var path = cardArray[index+1]["arenaId"];
        var newIndex = index+1;
        this.setState({
            activeCardPath : path,
            cardIndex : newIndex,
        });
    }
    handleLeft(index){
        console.log(index);
        var path = cardArray[index-1]["arenaId"];
        var newIndex = index-1;
        this.setState({
            activeCardPath : path,
            cardIndex : newIndex,
        });
    }

    handleTouch(cardPath,cardIndex) {
        const newBoolState = this.state.cardActive == true ? false : true;
        this.setState({
            activeCardPath : cardPath,
            cardActive: newBoolState,
            cardIndex : cardIndex,
        });
    }

    createCards(){
        var that = this
        var cardJSXArray = cardArray.map(function(data,index) {
                return <Card index={index} reqpath={data["arenaId"]} text={data["name"]} press={that.handleTouch} lrgImg={data["lrg_img_link"]} smlImg={data["sml_img_link"]} key={data["sml_img_link"]} />
        });

        return cardJSXArray;
    }

    render() {
            return (
                <View style={styles.outerView}>
                    <ScrollView scrollEnabled={this.state.cardActive ? false : true}>
                        <View style={styles.cardContainer}>
                            {this.createCards()}
                        </View>
                    </ScrollView>
                    {this.state.cardActive ? (
                        <BigCard pressRight={this.handleRight} pressLeft={this.handleLeft} pressDown={this.handleTouch} reqpath={this.state.activeCardPath} index={this.state.cardIndex}/>
                    ) : (
                        <View style={{display:'none'}}></View>
                    )}
                </View>
            );
        }

}

const styles = StyleSheet.create({
    outerView : {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    cardContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
