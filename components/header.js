import React from 'react';
import { StyleSheet, Text, View,Button, Animated, PanResponder,Easing } from 'react-native';
import {FilterBox} from './filterbox.js'


export class Header extends React.Component {
    constructor(props){
        super(props);
        this.extendRetract = this.extendRetract.bind(this);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (event, gesture) => {
                    if(this.state.extendedBool){
                        position.setValue({ x: 0, y: gesture.dy+gesture.y0 });
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
                            this.setState({extendedBool:false});
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
            extendedBool:false
        };
    }

    extendRetract(){
        var newExtendedBool = this.state.headerExtended ? false :true;
        this.setState({
            headerExtended :newExtendedBool
        });
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
        })

        return (
            <Animated.View style={[styles.outerHeader,{height: headerHight } ]}
                {...this.state.panResponder.panHandlers}
                >
                <Animated.View style={[styles.headerContentContainer,{top:headerContentTop}]}>
                    <View style={styles.topContent}>
                        <FilterBox filterPress={this.props.filterPress} />
                    </View>
                    <View style={styles.dividerLine} />
                    <View style={styles.bottomContent}>
                        <View style={{width:200,height:100,backgroundColor:'green'}} />
                        <View style={{width:100,height:50,backgroundColor:'steelblue'}} />
                    </View>
                </Animated.View>
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
