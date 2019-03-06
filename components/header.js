import React from 'react';
import { StyleSheet, Text, View,Button, Animated, PanResponder,Easing ,TouchableHighlight,ImageBackground} from 'react-native';
import {FilterBox} from './filterbox.js';
import {DeckBalance} from './deckBalance.js';


export class Header extends React.Component {
    constructor(props){
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (event, gesture) => {
                    if(!this.state.renderHeaderCont){
                        this.setState({
                            renderHeaderCont:true,
                        });
                    }
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
                                    renderHeaderCont:false,
                                });
                            },200);
                        }
                        else{
                            position.setValue({x:0,y:400});
                            this.setState({extendedBool:true});
                        }
                    }
                    else{
                        if(gesture.dy+gesture.y0>100){
                            Animated.timing(position,{
                                toValue: {x:0, y:400},
                                duration: 200,
                                easing: Easing.linear,
                            }).start();
                            this.setState({extendedBool:true});
                        }
                        else{
                            position.setValue({x:0,y:0});
                            this.setState({extendedBool:false});
                        }
                    }
                },
        });
        this.state = {
            position,
            panResponder,
            extendedBool:false,
            renderHeaderCont:false,
        };
    }
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    componentDidUpdate(){
        console.log("Header Update")
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
        if(this.state.renderHeaderCont){
            return (
                    <Animated.View style={[styles.outerHeader,{height: headerHight } ]}
                        {...this.state.panResponder.panHandlers}
                        >
                        <ImageBackground source={require('../assets/divImg/texture2.png')} style={{width:'100%',height:'100%'}} >
                        <Animated.View style={[styles.headerContentContainer,{top:headerContentTop}]}>
                            <View style={styles.topContent}>
                                <TouchableHighlight onPress={this.props.selectLib}>
                                    <FilterBox filterPress={this.props.filterPress} activeCards={this.props.activeCards} />
                                </ TouchableHighlight>
                            </View>
                            <View style={styles.dividerLine} />
                                <View style={styles.bottomContent}>
                                    <TouchableHighlight onPress={this.props.selectDeck}>
                                        <DeckBalance deckBuild={this.props.deckBuild}/>
                                    </TouchableHighlight>
                                    <View style={{width:100,height:50,backgroundColor:'steelblue'}} />
                                </View>
                        </Animated.View>
                        </ImageBackground>
                    </Animated.View>
            );
        }
        else{
            return(

                <Animated.View style={[styles.outerHeader,{height: headerHight } ]}
                    {...this.state.panResponder.panHandlers}
                    >
                    <ImageBackground source={require('../assets/divImg/texture2.png')} style={{width:'100%',height:'100%'}} >
                        <Text style={{marginTop:20,alignSelf:'center',color:'white',fontSize:40}}>Library Active</Text>
                    </ImageBackground>
                </Animated.View>
            );
        }
    }
}
const styles = StyleSheet.create({

    outerHeader: {
        flex:1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000',


        position:'absolute',
        top:0,
        width:'100%',
        zIndex:1,
    },
    headerContentContainer:{
        width:'100%',
        flex:1,
        backgroundColor:'yellow',
        alignItems: 'center',

    },
    topContent:{
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'lightblue',
    },
    dividerLine:{
        height: 0,
        width: '80%',
        backgroundColor: 'black',
        borderColor:'black',
        borderWidth: 3,
    },
    bottomContent:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems:'center'
    }

});
