import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Animated , PanResponder } from 'react-native';
import Images from '../assets/imgIndex.js';
import { Dimensions } from 'react-native'

var {HEIGHT, WIDTH} = Dimensions.get('window');
var cardWidth = WIDTH*0.8;
console.log(WIDTH);

export class BigCard extends React.Component {

    constructor(props) {
        super(props);
        this.cardPressed = this.cardPressed.bind(this);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (event, gesture) => {
                    position.setValue({ x: gesture.dx, y: gesture.dy });
                },
                onPanResponderRelease: (event, gesture) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                    position.setValue({ x: 0, y: 0 });
                    if(gesture.dx>100 && Math.abs(gesture.dy)<100){
                        //Prev Card
                        console.log("prev card");
                        this.props.pressLeft(this.props.index);
                    }
                    else if (gesture.dx<-100 && Math.abs(gesture.dy)<100) {
                        //Next Card
                        console.log("Next card");
                        this.props.pressRight(this.props.index);
                    }
                    else if (gesture.dy>100) {
                        this.props.pressDown(null,null);
                    }

                },
        });

      this.state = { panResponder, position  };

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
                    style={[styles.imageContainer,this.state.position.getLayout()]}
                    {...this.state.panResponder.panHandlers}
                    >
                    <Image source={path}  style={styles.image}/>
                </Animated.View>

        );
    }
}



const styles = StyleSheet.create({
    image: {
        width: '100%',
        position: 'relative',
        resizeMode: 'contain',
    },
    imageContainer: {
        height:'80%',
        width:'80%',
        position:'absolute',
    },

});


/*
Deprecated imageContainer
width: cardWidth,
alignItems: 'center',
borderWidth: 1,
borderColor:'#0f0',

*/
