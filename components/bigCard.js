import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Animated , PanResponder,Dimensions,Easing } from 'react-native';
import Images from '../assets/imgIndex.js';
import {QuantityTracker} from './quantityTracker.js';


export class BigCard extends React.Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const positionMiddle = new Animated.ValueXY();
        const opacity = new Animated.Value(1);
        const scale = new Animated.Value(1);
        const spin = new Animated.Value(0);
        var movingBool = false;
        const panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (event, gesture) => {
                    if(!movingBool){
                        position.setValue({ x: gesture.dx, y: gesture.dy });
                        positionMiddle.setValue({x: gesture.dx, y: gesture.dy});
                    }
                },
                onPanResponderRelease: (event, gesture) => {

                    //Prev Card
                    if(gesture.dx>50 && Math.abs(gesture.dy)<200){

                        var screenWidth = Dimensions.get('window').width;
                        movingBool = true;
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
                            movingBool = false;
                        }, 600);

                    }

                    //Next Card
                    else if (gesture.dx<-50 && Math.abs(gesture.dy)<200) {
                        var screenWidth = Dimensions.get('window').width;
                        movingBool = true;
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
                            movingBool = false;
                        }, 600);
                    }


                    //Close card
                    else if (gesture.dy>100) {
                        var screenHeight = Dimensions.get('window').height;
                        Animated.parallel([
                            Animated.timing(this.state.scale, {
                                toValue: 0,
                                duration: 300,
                                easing: Easing.linear,
                            }),
                            Animated.timing(positionMiddle,{
                                toValue: {x:0, y:screenHeight},
                                duration: 300,
                                easing: Easing.linear,
                            }),
                            Animated.timing(opacity,{
                                toValue:0,
                                duration:0
                            })
                        ]).start();
                        setTimeout(() => {this.props.pressDown(null,this.props.index)}, 300);
                    }

                    //Add card
                    else if(gesture.dy<-100){
                        var screenHeight = Dimensions.get('window').height;
                        var addSucessBool = this.props.addCard(this.props.index);
                        console.log(addSucessBool);
                        if(addSucessBool){
                            this.setState({
                                deckQuantMid: this.state.deckQuantMid +1
                            })
                            Animated.sequence([
                                Animated.parallel([
                                    Animated.timing(opacity,{
                                        toValue:0,
                                        duration:0,
                                    }),
                                    Animated.timing(positionMiddle,{
                                        toValue: {x:0, y:-2000},
                                        duration: 500,
                                        easing: Easing.linear,
                                    }),
                                    Animated.timing(this.state.scale,{
                                        toValue: 0,
                                        duration: 500,
                                        easing: Easing.linear,
                                    }),
                                ]),
                                Animated.timing(positionMiddle,{
                                    toValue: {x:0, y:0},
                                    duration: 0,
                                    easing: Easing.linear,
                                }),
                                Animated.timing(opacity,{
                                    toValue: 1,
                                    duration: 0,
                                    easing: Easing.linear,
                                }),

                                Animated.timing(scale,{
                                    toValue: 1,
                                    duration: 0,
                                    easing: Easing.linear,
                                }),
                            ]).start();
                        }
                        else{
                            Animated.sequence([
                                Animated.timing(positionMiddle,{
                                    toValue: {x:0, y:0},
                                    duration: 50,
                                    easing: Easing.linear,
                                }),
                                Animated.spring(positionMiddle,{
                                    toValue: {x:100, y:0},
                                    duration:500,
                                }),
                            ]).start();
                        }
                    }

                    //No position registrered
                    else{
                        position.setValue({ x: 0, y: 0 });
                        positionMiddle.setValue({x: 0, y: 0});
                    }
                },
        });



        this.state = {
            panResponder, position, positionMiddle, scale, opacity,
            deckQuantMid: 0
        };
    }
    shouldComponentUpdate(nextProps,nextState){
        return true
    }
    componentDidUpdate(){
        console.log("Big Card Update");
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            deckQuantMid:nextProps.deckQuantMid
        })
    }


    render() {
        var pathLeft = Images.l[this.props.prevId];
        var pathMiddle = Images.l[this.props.arenaId];
        var pathRight = Images.l[this.props.nextId];

        var screenWidth = Dimensions.get('window').width;

        const rightLeftPos = this.state.position.x.interpolate({
            inputRange:[0,screenWidth],
            outputRange:[0,2*screenWidth],
        });

        const spin = this.state.positionMiddle.x.interpolate({
            inputRange:[0,screenWidth],
            outputRange:['0deg','20deg']
        });

        return (
                <Animated.View
                    style={[styles.outerAnimated,
                        {transform: [{scale: this.state.scale},{perspective: 1000},],}
                    ]}
                    {...this.state.panResponder.panHandlers}
                    >
                    <View style={{flexDirection:'row',flex:1,justifyContent: 'space-evenly'}} >
                        <Animated.View style={[styles.imageContainer,{left:rightLeftPos,opacity:this.state.opacity}]}>
                            <QuantityTracker quantity={this.props.quantityLeft} deckQuant={this.props.deckQuantLeft} />
                            <Image source={pathLeft} style={styles.image}/>
                        </Animated.View>
                        <Animated.View style={[styles.imageContainer,{zIndex:-1},this.state.positionMiddle.getLayout(),
                            {transform: [{rotate: spin}],}]}>
                            <QuantityTracker quantity={this.props.quantityMid} deckQuant={this.state.deckQuantMid} />
                            <Image source={pathMiddle}  style={styles.image}/>
                        </Animated.View>
                        <Animated.View style={[styles.imageContainer,{left:rightLeftPos,opacity:this.state.opacity}]}>
                            <QuantityTracker quantity={this.props.quantityRight} deckQuant={this.props.deckQuantRight}/>
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
          { scale: 0.55 },
        ],
        borderRadius: 20,
        borderWidth:2,
        borderColor:'yellow',
    },
    imageContainer: {
        width:'30%',
        alignItems:'center',
        justifyContent: 'space-around',

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
