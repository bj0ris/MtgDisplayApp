import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Animated , PanResponder,Dimensions,Easing } from 'react-native';
import Images from '../assets/imgIndex.js';
import {QuantityTracker} from './quantityTracker.js';


const {screenHeight, screenWidth} = Dimensions.get('window');
var cardWidth = screenWidth*0.5;
//const screenWidth = Dimensions.get('window').width;

export class BigCard extends React.Component {
    constructor(props) {
        super(props);
        this.cardPressed = this.cardPressed.bind(this);
        const position = new Animated.ValueXY();
        const positionMiddle = new Animated.ValueXY();
        const scale = new Animated.Value(1);
        const panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (event, gesture) => {
                    position.setValue({ x: gesture.dx, y: gesture.dy });
                    positionMiddle.setValue({x: gesture.dx, y: gesture.dy});
                },
                onPanResponderRelease: (event, gesture) => {

                    //Prev Card
                    if(gesture.dx>50 && Math.abs(gesture.dy)<200){
                        /*
                        Animated.sequence([
                            Animated.timing(this.state.position, {
                                toValue: {x: 400, y: 0},
                                easing: Easing.elastic(),
                                duration: 200,
                            }),
                            Animated.timing(position, {
                                toValue: {x: -400, y: 0},
                                easing: Easing.elastic(),
                                duration: 0,
                            }),
                            Animated.timing(this.state.position.x, {
                                toValue: 0,
                                easing: Easing.back(),
                                duration: 300,
                            }),
                        ]).start();
                        setTimeout(() => {this.props.pressLeft(this.props.index)}, 100);
                        this.props.pressLeft(this.props.index);
                        position.setValue({ x: 0, y: 0 });
                        */
                        var screenWidth = Dimensions.get('window').width;

                        console.log(screenWidth);
                        Animated.parallel([
                            Animated.timing(this.state.position, {
                                toValue: {x: ((screenWidth/2)+(0.12*screenWidth)), y: 0},
                                easing: Easing.elastic(),
                                duration: 600,
                            }),
                            Animated.timing(this.state.positionMiddle, {
                                toValue: {x: ((2*screenWidth)), y: 0},
                                easing: Easing.linear,
                                duration: 600,
                            }),

                        ]).start();

                        setTimeout(() => {
                            this.props.pressLeft(this.props.index);
                            position.setValue({ x: 0, y: 0 });
                            positionMiddle.setValue({x: 0, y: 0});
                        }, 600);

                    }

                    //Next Card
                    else if (gesture.dx<-50 && Math.abs(gesture.dy)<200) {

                        /*
                        this.props.pressRight(this.props.index);
                        position.setValue({ x: (screenWidth/2), y: 0 });
                        */
                        var screenWidth = Dimensions.get('window').width;

                        console.log(screenWidth);
                        Animated.parallel([
                            Animated.timing(this.state.position, {
                                toValue: {x: ((-screenWidth/2)-(0.12*screenWidth)), y: 0},
                                easing: Easing.elastic(),
                                duration: 600,
                            }),
                            Animated.timing(this.state.positionMiddle, {
                                toValue: {x: ((-2*screenWidth)), y: 0},
                                easing: Easing.linear,
                                duration: 600,
                            }),

                        ]).start();

                        setTimeout(() => {
                            this.props.pressRight(this.props.index);
                            position.setValue({ x: 0, y: 0 });
                            positionMiddle.setValue({x: 0, y: 0});
                        }, 600);
                    }
                    /*

                    Animated.timing(position, {
                        toValue: {x: 400, y: 0},
                        easing: Easing.elastic(),
                        duration: 0,
                    }),
                    Animated.timing(this.state.position.x, {
                        toValue: 0,
                        easing: Easing.back(),
                        duration: 300,
                    }),

                    */

                    //Close card
                    else if (gesture.dy>100) {
                        Animated.parallel([
                            Animated.timing(this.state.scale, {
                                toValue: 0,
                                duration: 300,
                                easing: Easing.linear,
                            }),
                            Animated.timing(position,{
                                toValue: {x:0, y:screenHeight}
                            })
                        ]).start();
                        setTimeout(() => {this.props.pressDown(null,this.props.index)}, 300);
                    }

                    //Add card
                    else if(gesture.dy<-100){
                        Animated.timing(position,{
                            toValue: {x:0, y:0},
                            duration: 300,
                            easing: Easing.linear,
                        }).start();
                        this.props.addCard(this.props.index)
                    }

                    //No position registrered
                    else{
                        position.setValue({ x: 0, y: 0 });
                    }
                },
        });



        this.state = {
            panResponder, position, positionMiddle, scale,
        };
    }


    cardPressed(){
        console.log("Big card pressed");
        this.props.press(this.props.index);
    }

    render() {
        var pathLeft = Images.l[this.props.prevId];
        var pathMiddle = Images.l[this.props.arenaId];
        var pathRight = Images.l[this.props.nextId];

        var screenWidth = Dimensions.get('window').width;

        const leftCardPos = this.state.position.x.interpolate({
            inputRange:[0,screenWidth],
            outputRange:[0,2*screenWidth],
        });
        const middleCardPos = this.state.position.x.interpolate({
            inputRange:[0,300],
            outputRange:[0,300],
        });
        const rightCardPos = this.state.position.x.interpolate({
            inputRange:[0,screenWidth],
            outputRange:[0,2*screenWidth],
        });
        //this.state.positionMiddle.getLayout(),
        console.log(this.state.position.x);
        return (

                <Animated.View
                    style={[styles.outerAnimated,
                        {transform: [{scale: this.state.scale},{perspective: 1000},],}
                    ]}
                    {...this.state.panResponder.panHandlers}
                    >
                    <View style={{flexDirection:'row',flex:1,justifyContent: 'space-evenly'}} >
                        <Animated.View style={[styles.imageContainer,{left:rightCardPos}]}>
                            <QuantityTracker quantity={this.props.quantity} />
                            <Image source={pathLeft} style={styles.image}/>
                        </Animated.View>
                        <Animated.View style={[styles.imageContainer,{zIndex:-1},this.state.positionMiddle.getLayout()]}>
                            <QuantityTracker quantity={this.props.quantity} />
                            <Image source={pathMiddle}  style={styles.image}/>
                        </Animated.View>
                        <Animated.View style={[styles.imageContainer,{left:rightCardPos}]}>
                            <QuantityTracker quantity={this.props.quantity} />
                            <Image source={pathRight} style={styles.image}/>
                        </Animated.View>
                    </View>
                </Animated.View>

        );
    }
}




const styles = StyleSheet.create({
    image: {

        resizeMode: 'cover',
        transform: [
          { scale: 0.6 },
        ],
        borderRadius: 20,
        borderWidth:2,
        borderColor:'yellow',
    },
    imageContainer: {
        width:'30%',
        alignItems:'center',
        justifyContent: 'center',

        position:'relative',
        borderWidth:2,
        borderColor:'green',
    },
    outerAnimated :{
        width:'300%',
        height:'70%',
        position:'absolute',
        marginTop:200,
        marginLeft:'-140%',



        borderWidth:2,
        borderColor:'black',

        flexDirection:'row',
    }
});


/*
Deprecated imageContainer
width: cardWidth,
alignItems: 'center',
borderWidth: 1,
borderColor:'#0f0',

*/
