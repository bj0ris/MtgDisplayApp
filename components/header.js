import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {FilterBox} from './filterbox.js'


export class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            headerExtended : false,
        }
        this.extendRetract = this.extendRetract.bind(this);

    }
    extendRetract(){
        var newExtendedBool = this.state.headerExtended ? false :true;
        this.setState({
            headerExtended :newExtendedBool
        });
    }

    render() {
        if(this.state.headerExtended){
            return (
                <View style={styles.filterExtended}>
                    <FilterBox filterPress={this.props.filterPress} />
                    <Button
                        onPress={this.extendRetract}
                        title="Learn Moreee"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            );
        }
        else{
            return (
                <View style={styles.filterRetracted}>
                    <Button
                        onPress={this.extendRetract}
                        title="Learn Moreee"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({

    filterRetracted: {
        height: 100,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },filterExtended: {
        height: 400,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#000',
    },
});
