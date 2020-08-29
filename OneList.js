import React, {Component} from 'react';
import {
    Text,
    StatusBar,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    PropTypes,
    View,
} from 'react-native';
export class OneList extends Component {

    render() {

        return <TouchableOpacity onPress={this.props.onPress}
            style={this.props.class}>
            <Text style={this.props.textclass}>
                {this.props.text}</Text>
        </TouchableOpacity>

    }
}