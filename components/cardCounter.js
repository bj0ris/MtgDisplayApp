import React from 'react';
import { StyleSheet, Text, View,Animated, Easing} from 'react-native';

export class CardCounter extends React.Component {

    calcCards(){
        var counter = 0;
        for(cardId in this.props.deckBuild){
            counter+=this.props.deckBuild[cardId];
        }

        return counter
    }

    render(){
        return(
            <Animated.View style={styles.cardCounter}>
                <Text style={styles.cardCounterText}>{this.calcCards()}</Text>
            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({

    cardCounter: {
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center'
    },
    cardCounterText:{
        fontWeight: 'bold',
        fontSize: 30,
        color:'white'
    }
});
