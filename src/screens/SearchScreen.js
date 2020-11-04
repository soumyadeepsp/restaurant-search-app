import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import '../api/yelp';
import yelp from '../api/yelp';
import ResultsList from '../components/ResultsList';

function SearchScreen(props) {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const filterResultsByPrice = (price) => {
        //price == $ || $$ || $$$ || $$$$
        return results.filter(result => {
            return result.price === price;
        })
    }
    
    const searchApi = async (searchTerm) => {
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'san jose'
                }
            });
            setResults(response.data.businesses);
        } catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
    }

    useEffect(() => {
        searchApi('pasta');
    }, [])

    return (
        <View style={{flex: 1}}>
            <SearchBar
                term={term}
                updateTerm={(newTerm) => {
                    setTerm(newTerm);
                }}
                onTermSubmit={() => {
                    console.log("submitted");
                    searchApi(term);
                }}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <ScrollView>
                <ResultsList
                    title="Cost Effective"
                    results={filterResultsByPrice('$')}
                />
                <ResultsList
                    title="Bit Pricier"
                    results={filterResultsByPrice('$$')}
                />
                <ResultsList
                    title="Big Spender"
                    results={filterResultsByPrice('$$$')}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SearchScreen;