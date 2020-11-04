import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ResultsDetail from './ResultsDetail';
import {withNavigation} from 'react-navigation';

function ResultsList(props) {
    if (!props.results.length) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{props.title}</Text>
            <FlatList
                data={props.results}
                horizontal
                keyExtractor={(item) => {return item.id}}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('ResultsShow', {id: item.id});
                        }}>
                            <ResultsDetail result={item}/>
                        </TouchableOpacity>
                    )
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    },
    container: {
        marginBottom: 10
    }
})

export default withNavigation(ResultsList);