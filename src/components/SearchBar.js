import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';

function SearchBar(props) {
    return (
        <View style={styles.background}>
            <Feather name="search" style={styles.iconStyle}/>
            <TextInput
                style={styles.inputStyle}
                placeholder="Search"
                value={props.term}
                onChangeText={(newTerm) => {
                    props.updateTerm(newTerm);
                }}
                onEndEditing={() => {
                    props.onTermSubmit();
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#D3D3D3',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
})

export default SearchBar;