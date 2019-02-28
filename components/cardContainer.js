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
    }
    componentDidUpdate(){
        console.log("containerUpdate");

    }
    shouldComponentUpdate (){
        return true;
    }
    handleRight(index){
        console.log(index);
        var path = this.props.cardArray[index+1]["arenaId"];
        var newIndex = index+1;
        this.setState({
            activeCardId : path,
            activeCardIndex : newIndex,
        });
    }
    handleLeft(index){
        console.log(index);
        var path = this.props.cardArray[index-1]["arenaId"];
        var newIndex = index-1;
        this.setState({
            activeCardId : path,
            activeCardIndex : newIndex,
        });
    }

    handleTouch(cardPath,cardIndex) {
        const newBoolState = this.state.cardActive == true ? false : true;
        this.setState({
            activeCardId : cardPath,
            cardActive: newBoolState,
            activeCardIndex : cardIndex,
        });
    }

    //fjdkslafjfkdsla
    createCards(){
        var that = this;
        var cardJSXArray = this.props.cardArray.map(function(data,index) {
                return <Card
                            quantity = {data["quantity"]}
                            activeCardIndex ={that.state.activeCardIndex}
                            index={index}
                            arenaId={data["arenaId"]}
                            text={data["name"]}
                            press={that.handleTouch}
                            lrgImg={data["lrg_img_link"]}
                            smlImg={data["sml_img_link"]}
                            key={data["sml_img_link"]} />
        });

        return cardJSXArray;
    }
    //divImg/texture1.jpg
    render() {
        console.log("test");
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
                            prevId = {this.props.cardArray[this.state.activeCardIndex-1]["arenaId"]}
                            nextId = {this.props.cardArray[this.state.activeCardIndex+1]["arenaId"]}

                            quantity={this.props.cardArray[this.state.activeCardIndex]["quantity"]}
                            pressRight={this.handleRight}
                            pressLeft={this.handleLeft}
                            pressDown={this.handleTouch}
                            arenaId={this.state.activeCardId}
                            index={this.state.activeCardIndex}
                            addCard ={this.props.addCard}
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
