import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {FilterSelector} from './filterselector.js'

export class FilterBox extends React.Component {


    render() {
        return (
            <View style={styles.filterContainer}>
                <View>
                    <FilterSelector colorTag = {'allOff'} color={'steelblue'} filterPress= {this.props.filterPress}/>
                </View>
                <View style={styles.smallFilterContainer}>
                    <FilterSelector colorTag = {'W'} color={'white'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'U'} color={'blue'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'B'} color={'black'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'R'} color={'red'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'G'} color={'green'} filterPress= {this.props.filterPress}/>
                    <FilterSelector colorTag = {'N'} color={'yellow'} filterPress= {this.props.filterPress}/>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({

    filterContainer:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'space-around',
        width: '80%',
        height: 150,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 75,
        marginTop: 20,
    },
    smallFilterContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-around',
        borderColor: 'black',
    }
});
