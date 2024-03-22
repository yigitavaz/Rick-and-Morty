import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
import SearchBar from '../../Components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import Pagination from '../../Components/Pagination';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EpisodeDetail = ({ route, navigation }) => {
  const { characters } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [characterData, setCharacterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Sayfa başına düşecek karakter sayısı
  const [paginatedData, setPaginatedData] = useState([]);



  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.all(characters.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
        setCharacterData(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Hata', 'Karakter verileri yüklenirken bir sorun oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [characters]);

  useEffect(() => {
    const filteredData = characterData.filter(character =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const end = currentPage * itemsPerPage;
    const start = end - itemsPerPage;
    setPaginatedData(filteredData.slice(start, end));
  }, [characterData, currentPage, searchQuery]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredCharacterData = characterData.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#97D3C1" />;
  }


  const addFavoriteCharacter = async (item) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArr = favorites ? JSON.parse(favorites) : [];

      // Aynı öğenin tekrar eklenmemesini sağlar
      if (favoritesArr.some(favoriteItem => favoriteItem.id === item.id)) {
        Alert.alert("Hata", "Bu karakter zaten favorilerinizde.");
        return;
      }

      // Favori limit kontrolü
      if (favoritesArr.length >= 10) {
        Alert.alert("Uyarı", "Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.");
        return;
      }

      // Yeni öğeyi favorilere ekleme
      favoritesArr.push(item);
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArr));
      Alert.alert("Başarılı", "Karakter favorilere eklendi.");

    } catch (error) {
      console.log('Favorilere ekleme hatası', error);
      Alert.alert("Hata", "Favorilere eklerken bir hata oluştu.");
    }
  };



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        style={styles.flatList}
        data={paginatedData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CharacterDetails', { character: item })}>
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.characterImage} />
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity onPress={() => addFavoriteCharacter(item)}>
                <Ionicons style={styles.heartIcon} name="heart" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        onScrollBeginDrag={Keyboard.dismiss}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCharacterData.length / itemsPerPage)}
        onPageChange={onPageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 3,
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
  heartIcon: {
    marginRight: 20
  }

});

export default EpisodeDetail;
