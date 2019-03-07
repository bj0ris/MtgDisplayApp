import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {FilterSelector} from './filterselector.js'

export class FilterBox extends React.Component {


    render() {
        return (
            <View style={this.props.collectActive ? styles.filterContainerActive : styles.filterContainerInactive}>
                <View>
                    <FilterSelector colorTag = {'allOff'} color={'steelblue'} filterPress= {this.props.filterPress}/>
                </View>
                <View style={styles.smallFilterContainer}>
                    <FilterSelector colorTag = {'W'} active={this.props.activeCards.includes('W')} color={'white'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'U'} active={this.props.activeCards.includes('U')} color={'blue'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'B'} active={this.props.activeCards.includes('B')} color={'black'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'R'} active={this.props.activeCards.includes('R')} color={'red'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'G'} active={this.props.activeCards.includes('G')} color={'green'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'N'} active={this.props.activeCards.includes('N')} color={'yellow'} filterPress= {this.props.filterPress}/>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({

    filterContainerInactive:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'space-around',
        width: '80%',
        height: 150,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 75,
        marginTop: 20,
        opacity:0.5
    },
    filterContainerActive:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'space-around',
        width: '80%',
        height: 150,
        borderColor: 'orange',
        borderWidth: 2,
        borderRadius: 75,
        marginTop: 20,
    },
    smallFilterContainer: {
        flex:1,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-evenly',
    }
});
