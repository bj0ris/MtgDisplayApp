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
        if((nextState.activeCard != this.state.activeCard) )  {
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
        // test = Images.s.s68286;
        //console.log(this.props.index);
        //

        const reqDim = [null, require('../assets/divImg/dim1.png'),require('../assets/divImg/dim2.png'),require('../assets/divImg/dim3.png'),require('../assets/divImg/dim4.png')]
        var path = Images.s[this.props.arenaId];
            if(this.state.activeCard){
                return (
                    <TouchableHighlight onPress={this.cardPressed}>
                        <View style={styles.cardActive} >
                            <Image source={reqDim[this.props.quantity]} />
                            <Image source={path}  style={styles.image} />
                        </View>
                    </TouchableHighlight>
                );
            }
            //
            else{
                return (
                    <TouchableHighlight onPress={this.cardPressed}>
                        <View style={styles.card} >
                            <Image source={reqDim[this.props.quantity]}/>
                            <Image source={path}  style={styles.image} />
                        </View>
                    </TouchableHighlight>
                );
            }
        }

}
//this.props.smlImggfhjnjklb
//source={require('../assets/img/65971s.jpg')}
//<Text onPress={this.testfunc}>{this.props.text}</Text>
//Somethingfgh


/*

*/
const styles = StyleSheet.create({
    card: {
        width: 73,
        height:122,
        margin: 15,
        marginBottom:0,
        borderWidth: 2,
        borderColor: '#000',
    },
    cardActive: {
        width: 73,
        height:122,
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
