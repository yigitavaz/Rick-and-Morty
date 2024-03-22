import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';


const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.episodes}>
                    <Button
                        onPress={() => navigation.navigate('Episodes')}
                        labelStyle={styles.episodesText}
                        contentStyle={styles.contentEpisodes}>BÖLÜMLER VE KARAKTERLERİ
                    </Button>
                </View>
                <View style={styles.favorites}>
                    <Button onPress={() => navigation.navigate('Favorites')} labelStyle={styles.favoritesText} contentStyle={styles.contentFavorites}>FAVORİ KARAKTERLER</Button>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },

    content: {
        alignItems: 'center',
        paddingTop: 20,
    },
    episodes: {
        width: 350,
        height: 44,
        justifyContent: 'center',
        backgroundColor: '#97D3C1',
        borderRadius: 4,
        marginBottom: 5,
    },
    episodesText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
    contentEpisodes: {
        justifyContent: 'flex-start',
    },
    favorites: {
        width: 350,
        height: 44,
        justifyContent: 'center',
        backgroundColor: '#97D3C1',
        borderRadius: 4,
        marginBottom: 5,
    },
    favoritesText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
    contentFavorites: {
        justifyContent: 'flex-start'
    },
});

export default Home;
