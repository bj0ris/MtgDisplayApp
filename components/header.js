import React from 'react';
import { StyleSheet, Text, View,Button, Animated, PanResponder,Easing ,TouchableHighlight,ImageBackground,BackHandler} from 'react-native';
import {FilterBox} from './filterbox.js';
import {DeckBox} from './deckBox.js'


export class Header extends React.Component {
    constructor(props){
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (event, gesture) => {

                    if(this.state.extendedBool ){
                        position.setValue({ x: 0, y: 400+gesture.dy });
                    }
                    else{
                        position.setValue({ x: 0, y: gesture.dy });
                    }
                },
                onPanResponderRelease: (event, gesture) => {
                    if(this.state.extendedBool){
                        if(Math.abs(gesture.dy)>75){
                            Animated.timing(position,{
                                toValue: {x:0, y:0},
                                duration: 200,
                                easing: Easing.linear,
                            }).start();
                            //position.setValue({x:0,y:0});
                            setTimeout(() => {
                                this.setState({
                                    extendedBool:false,
                                });
                            },200);
                        }
                        else{
                            position.setValue({x:0,y:400});
                            this.setState({extendedBool:true});
                        }
                    }
                    else{
                        //Extend header
                        Animated.timing(position,{
                            toValue: {x:0, y:400},
                            duration: 200,
                            easing: Easing.linear,
                        }).start();
                        this.setState({extendedBool:true});

                    }
                },
        });
        this.state = {
            position,
            panResponder,
            extendedBool:false,
        };
        this.retractHeader = this.retractHeader.bind(this);
        this.handleBackPress = this.handleBackPress.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    componentDidUpdate(){
        console.log("Header Update")
        if(this.state.extendedBool){
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        }
        else{
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        }
    }

    handleBackPress(){
        console.log("Returning true");
        if(this.state.extendedBool){
            this.retractHeader();
        }
        return true;
    }

    retractHeader(){
        Animated.timing(this.state.position,{
            toValue: {x:0, y:0},
            duration: 200,
            easing: Easing.linear,
        }).start();
        //position.setValue({x:0,y:0});
        setTimeout(() => {
            this.setState({
                extendedBool:false,
            });
        },200);
    }
    render() {
        const headerHight = this.state.position.y.interpolate({
            inputRange:[0,300,700],
            outputRange:[100,400,450],
        });

        const headerContentTop = this.state.position.y.interpolate({
            inputRange:[0,300],
            outputRange:[-300,0],
            extrapolate:'clamp'
        });
        const textHight = this.state.position.y.interpolate({
            inputRange:[0,200],
            outputRange:[0,-450],
            extrapolate: 'clamp'
        });
        var topText = this.props.collectActive ? "Viewing Collection" : "Viewing Deck";

        return (
                <Animated.View style={[styles.outerHeader,{height: headerHight } ]}
                    {...this.state.panResponder.panHandlers}
                    >
                    <ImageBackground source={require('../assets/divImg/texture2.png')} style={{width:'100%',height:'100%'}} >
                    <Animated.View style={[styles.headerContentContainer,{top:headerContentTop}]}>
                        <View style={styles.topContent}>
                            <TouchableHighlight onPress={this.props.selectColl}>
                                <FilterBox collectActive={this.props.collectActive} filterPress={this.props.filterPress} activeCards={this.props.activeCards} />
                            </ TouchableHighlight>
                        </View>

                        <View style={styles.dividerLine} />

                        <View style={this.props.collectActive ? styles.bottomContentInactive : styles.bottomContentActive}>
                            <TouchableHighlight onPress={this.props.selectDeck}>
                                <DeckBox headerExtended={this.state.extendedBool} deckBuild={this.props.deckBuild} />
                            </TouchableHighlight>
                        </View>
                    </Animated.View>
                    <Animated.Text style={[{alignSelf:'center',color:'white',fontSize:40},{top:textHight}]}>{topText}</Animated.Text>
                    </ImageBackground>
                </Animated.View>
        );

    }
}
const styles = StyleSheet.create({

    outerHeader: {
        flex:1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderWidth: 2,
        borderColor: '#000',
        marginTop:0,

        position:'absolute',
        top:0,
        width:'100%',
        zIndex:1,
    },
    headerContentContainer:{
        width:'100%',
        flex:1,
        alignItems: 'center',

    },
    topContent:{
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dividerLine:{
        height: 0,
        width: '80%',
        backgroundColor: 'black',
        borderColor:'black',
        borderWidth: 3,
    },
    bottomContentActive:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
        borderColor: 'orange',
        borderWidth: 2,
        borderRadius: 75,
    },
    bottomContentInactive:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 75,
        opacity:0.5,
    }

});
