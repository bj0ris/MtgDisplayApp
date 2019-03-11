import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableHighlight } from 'react-native';
import Images from '../assets/imgIndex.js';
import {QuantityTracker} from './quantityTracker.js';



export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.cardPressed = this.cardPressed.bind(this);
        this.state = {
            activeCard : this.props.activeCardIndex == this.props.index,
            emptyCard : false,
        }
    }
    componentDidUpdate(){
        console.log("card     Update");
    }

    shouldComponentUpdate (nextProps, nextState){
        //If this card is activated OR change of quantity added to deck
        if((nextState.activeCard != this.state.activeCard) || (this.props.deckQuant != nextProps.deckQuant) )  {
            return true;
        }
        else{
            return false
        }
    }
    componentWillReceiveProps (nextProps){
        var activeBool = nextProps.activeCardIndex == nextProps.index;
        this.setState({
            activeCard:activeBool
        });
        }

    cardPressed(){
        this.setState({
            activeCard:true
        });
        this.props.press( this.props.arenaId, this.props.index);
    }

    render() {
        const reqDim = [[null],
                        [require('../assets/divImg/dim1.png'),require('../assets/divImg/dim11.png')],
                        [require('../assets/divImg/dim2.png'),require('../assets/divImg/dim21.png'),require('../assets/divImg/dim22.png')],
                        [require('../assets/divImg/dim3.png'),require('../assets/divImg/dim31.png'),require('../assets/divImg/dim32.png'),require('../assets/divImg/dim33.png')],
                        [require('../assets/divImg/dim4.png'),require('../assets/divImg/dim41.png'),require('../assets/divImg/dim42.png'),require('../assets/divImg/dim43.png'),require('../assets/divImg/dim44.png')]
                    ];

        var path = Images.s[this.props.arenaId];
        var counterPath = reqDim[this.props.quantity][this.props.deckQuant];

            if(this.state.activeCard){
                return (
                    <TouchableHighlight onPress={this.cardPressed}>
                        <View style={styles.cardActive} >
                            <Image source={counterPath} />
                            <Image source={path}  style={styles.image} />
                        </View>
                    </TouchableHighlight>
                );
            }
            else{
                return (
                    <TouchableHighlight onPress={this.cardPressed}>
                        <View style={styles.card} >
                            <Image source={counterPath}/>
                            <Image source={path}  style={styles.image} />
                        </View>
                    </TouchableHighlight>
                );
            }
        }

}


const styles = StyleSheet.create({
    card: {
        width: 77,
        height:126,
        margin: 15,
        marginBottom:0,
        borderWidth: 2,
        borderColor: '#000',
    },
    cardActive: {
        width: 77,
        height:126,
        margin: 15,
        marginBottom:0,
        borderWidth: 2,
        borderColor: '#f1802d',
    },
    image: {
        position: 'absolute',
        top: -31,
        width:73,
        resizeMode: 'contain',
        borderRadius: 4,
    },

});
