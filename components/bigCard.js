import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Animated , PanResponder,Dimensions,Easing } from 'react-native';
import Images from '../assets/imgIndex.js';


var {height, width} = Dimensions.get('window');
var cardWidth = width*0.8;

export class BigCard extends React.Component {
    constructor(props) {
        super(props);
        this.cardPressed = this.cardPressed.bind(this);
        const position = new Animated.ValueXY();
        const scale = new Animated.Value(1);
        const panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (event, gesture) => {
                    position.setValue({ x: gesture.dx, y: gesture.dy });
                },
                onPanResponderRelease: (event, gesture) => {

                    //Prev Card
                    if(gesture.dx>50 && Math.abs(gesture.dy)<100){
                        Animated.sequence([
                            Animated.timing(this.state.position, {
                                toValue: {x: 400, y: 0},
                                easing: Easing.elastic(),
                                duration: 100,
                            }),
                            Animated.timing(position, {
                                toValue: {x: -400, y: 0},
                                easing: Easing.elastic(),
                                duration: 100,
                            }),
                            Animated.timing(this.state.position.x, {
                                toValue: 0,
                                easing: Easing.back(),
                                duration: 300,
                            }),
                        ]).start();
                        setTimeout(() => {this.props.pressLeft(this.props.index)}, 100);
                    }

                    //Next Card
                    else if (gesture.dx<-50 && Math.abs(gesture.dy)<100) {
                        Animated.sequence([
                            Animated.timing(this.state.position, {
                                toValue: {x: -400, y: 0},
                                easing: Easing.elastic(),
                                duration: 100,
                            }),
                            Animated.timing(position, {
                                toValue: {x: 400, y: 0},
                                easing: Easing.elastic(),
                                duration: 100,
                            }),
                            Animated.timing(this.state.position.x, {
                                toValue: 0,
                                easing: Easing.back(),
                                duration: 300,
                            }),
                        ]).start();
                        setTimeout(() => {this.props.pressRight(this.props.index)}, 100);
                    }

                    //Close card
                    else if (gesture.dy>100) {
                        Animated.parallel([
                            Animated.timing(this.state.scale, {
                                toValue: 0,
                                duration: 300,
                                easing: Easing.linear,
                            }),
                            Animated.timing(position,{
                                toValue: {x:0, y:height}
                            })
                        ]).start();
                        setTimeout(() => {this.props.pressDown(null,null)}, 300);
                    }

                    //No position registrered
                    else{
                        position.setValue({ x: 0, y: 0 });
                    }
                },
        });



        this.state = {
            panResponder, position, scale,
        };
    }


    cardPressed(){
        console.log("Big card pressed");
        this.props.press(this.props.index);
    }

    render() {
        var path = Images.l[this.props.reqpath];
        /*console.log(typeof this.props.reqpath);dsadsa
        //console.log(this.props.reqpath);dsadsasdadsadsaads
        //console.log(path);style={styles.image}
        <TouchableHighlight onPress={this.cardPressed} style={styles.imageContainer}>
        </TouchableHighlight>
        */
        return (

                <Animated.View
                    style={[styles.imageContainer,this.state.position.getLayout(),
                        {transform: [{scale: this.state.scale},{perspective: 1000},],}
                    ]}
                    {...this.state.panResponder.panHandlers}
                    >
                    <Image source={path}  style={styles.image}/>
                </Animated.View>

        );
    }
}




const styles = StyleSheet.create({
    image: {
        width:'100%',
        position: 'relative',
        resizeMode: 'contain',
        borderRadius: 20,
    },
    imageContainer: {
        width:cardWidth,
        position:'absolute',
        marginLeft:'10%',

        borderWidth:2,
        borderColor:'black',

        flex:1,
        alignItems:'flex-start',
        justifyContent: 'space-between',
    },

});


/*
Deprecated imageContainer
width: cardWidth,
alignItems: 'center',
borderWidth: 1,
borderColor:'#0f0',

*/
