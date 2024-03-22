import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const favoritesStr = await AsyncStorage.getItem('favorites');
      const favoritesArr = favoritesStr ? JSON.parse(favoritesStr) : [];
      setFavorites(favoritesArr);
    } catch (error) {
      console.log('Favoriler yüklenirken hata oluştu', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavoriteCharacter = async (characterId) => {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    const filteredFavorites = favorites.filter((item) => item.id !== characterId);
    await AsyncStorage.setItem('favorites', JSON.stringify(filteredFavorites));
    setFavorites(filteredFavorites);
  };

  const confirmRemoveFavorite = (characterId) => {
    Alert.alert(
      "Favorilerden Çıkar",
      "Bu karakteri favorilerinizden çıkarmak istediğinize emin misiniz?",
      [

        { text: "Evet", onPress: () => removeFavoriteCharacter(characterId) },
        {
          text: "Hayır",
          onPress: () => console.log("Silme işlemi iptal edildi"),
          style: "cancel"
        },

      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        style={styles.flatList}
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.characterImage} />
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => confirmRemoveFavorite(item.id)}>
              <Ionicons style={styles.closeIcon} name="close-circle-outline" size={24} color="#E50000" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 12,
    flexDirection: 'row',
    backgroundColor: '#97D3C1',
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'white'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
    flexShrink: 1,
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#ffffff',
  },
  flatList: {
    marginBottom: 20
  },
  closeIcon: {
    marginRight: 20,
    fontSize: 30
  }




});

export default Favorites;

