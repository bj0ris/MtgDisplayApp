import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableHighlight ,ImageBackground  } from 'react-native';
import {Card} from './card.js';
import {BigCard} from './bigCard.js';



////dsafdsgdsgdfh
export class CardContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeCardId : null,
            cardActive: false,
            activeCardIndex: null,
        }
        this.handleTouch = this.handleTouch.bind(this);
        this.handleRight = this.handleRight.bind(this);
        this.handleLeft = this.handleLeft.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.findDeckQuantity = this.findDeckQuantity.bind(this);
    }
    componentDidUpdate(){
        console.log("containerUpdate");

    }
    shouldComponentUpdate (nextProps,nextState){

        return true;
    }
    componentWillReceiveProps (nextProps){
        //If We change cardArrray (e.x from library to deck)
        if(nextProps.cardArray.length != this.props.cardArray.length)
        this.setState({
            activeCardId : null,
            cardActive: false,
            activeCardIndex: null,

        });
    }

    handleRight(index){
        var nextIndex = this.findNextIndex(index)
        var path = this.props.cardArray[nextIndex]["arenaId"];
        var newIndex = nextIndex;
        this.setState({
            activeCardId : path,
            activeCardIndex : newIndex,
        });
    }
    handleLeft(index){
        var prevIndex = this.findPrevIndex(index);
        var path = this.props.cardArray[prevIndex]["arenaId"];
        var newIndex = prevIndex;
        this.setState({
            activeCardId : path,
            activeCardIndex : newIndex,
        });
        this.findNextIndex = this.findNextIndex.bind(this);
        this.findPrevIndex = this.findPrevIndex.bind(this);
    }

    handleUp(index){
        this.props.addCard(index);
    }
    handleDown(index){
        this.handleTouch(null,index);
    }

    handleTouch(cardPath,cardIndex) {
        const newBoolState = this.state.cardActive == true ? false : true;
        this.setState({
            activeCardId : cardPath,
            cardActive: newBoolState,
            activeCardIndex : cardIndex,
        });
    }


    findDeckQuantity(index){
        
        var arenaId = this.props.cardArray[index]['arenaId'];
        if(this.props.deckBuild[arenaId] == undefined){
            return 0
        }
        else{
            return this.props.deckBuild[arenaId]
        }
    }
    findNextIndex(index){
        if(this.state.activeCardIndex==this.props.cardArray.length-1){
            return 0;
        }
        else{
            return index+1;
        }
    }
    findPrevIndex(index){
        if(this.state.activeCardIndex == 0){
            return this.props.cardArray.length-1;
        }
        else{
            return index-1;
        }
    }

    //fjdkslafjfkdsla
    createCards(){
        var that = this;
        var cardJSXArray = this.props.cardArray.map(function(data,index) {

                return <Card
                            deckQuant = {that.findDeckQuantity(index)}

                            quantity = {data["quantity"]}
                            activeCardIndex ={that.state.activeCardIndex}
                            index={index}
                            arenaId={data["arenaId"]}
                            text={data["name"]}
                            press={that.handleTouch}
                            key={data["arenaId"]} />
        });

        return cardJSXArray;
    }
    //divImg/texture1.jpg
    render() {
        var nextIndex = this.findNextIndex(this.state.activeCardIndex);
        var prevIndex = this.findPrevIndex(this.state.activeCardIndex);


            return (
                <View style={styles.outerView}>
                    <ImageBackground source={require('../assets/divImg/texture1.jpg')} style={{width:'100%',height:'100%'}} >
                        <ScrollView scrollEnabled={this.state.cardActive ? false : true}>
                                <View style={styles.cardContainer}>
                                    {this.createCards()}
                                </View>
                        </ScrollView>
                    </ImageBackground>
                    {this.state.cardActive ? (
                        <BigCard
                            deckQuantMid = {this.findDeckQuantity(this.state.activeCardIndex)}
                            deckQuantLeft = {this.findDeckQuantity(prevIndex)}
                            deckQuantRight = {this.findDeckQuantity(nextIndex)}

                            quantityMid={this.props.cardArray[this.state.activeCardIndex]["quantity"]}
                            quantityLeft={this.props.cardArray[prevIndex]["quantity"]}
                            quantityRight={this.props.cardArray[nextIndex]["quantity"]}

                            prevId = {this.props.cardArray[prevIndex]["arenaId"]}
                            nextId = {this.props.cardArray[nextIndex]["arenaId"]}
                            pressRight={this.handleRight}
                            pressLeft={this.handleLeft}
                            pressDown={this.handleDown}
                            addCard ={this.props.addCard}
                            arenaId={this.state.activeCardId}
                            index={this.state.activeCardIndex}
                        />
                    ) : (
                        <View style={{display:'none'}}></View>
                    )}
                </View>
            );
        }

}

const styles = StyleSheet.create({
    outerView : {
        width:'100%',
        flex:1,
        height:10000,
        alignItems: 'center',

        justifyContent: 'center',
    },
    cardContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',

        top:100,
        marginBottom:100,
    },
});
