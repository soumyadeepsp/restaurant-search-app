import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import '../api/yelp';
import yelp from '../api/yelp';

function ResultsShowScreen(props) {
    const id = props.navigation.getParam('id');
    const [result, setResult] = useState(null);
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    }
    useEffect(() => {
        getResult(id);
    }, [])
    if (!result) {
        return null;
    }
    return (
        <View>
            <Text>{result.name}</Text>
            <FlatList
                data={result.photos}
                keyExtractor={(photo) => {
                    return photo;
                }}
                renderItem={({item}) => {
                    return <Image style={styles.imageStyle} source={{uri: item}}/>
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 200,
        width: 300,
    }
})

export default ResultsShowScreen;