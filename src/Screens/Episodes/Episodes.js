import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import SearchBar from '../../Components/SearchBar';
import Pagination from '../../Components/Pagination';

const Episodes = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // veya her sayfa için kaç öğe göstermek istediğinize göre bir değer
  const totalPages = Math.ceil(episodes.length / itemsPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Birden fazla API adresi bir dizide
    const apiUrls = [
      'https://rickandmortyapi.com/api/episode',
      'https://rickandmortyapi.com/api/episode?page=2',
      'https://rickandmortyapi.com/api/episode?page=3'
    ];

    const fetchEpisodes = async () => {
      try {
        // Her bir URL için fetch işlemi
        const fetchPromises = apiUrls.map(url => fetch(url).then(response => response.json()));

        // Promise.all ile tüm fetch işlemleri tamamla
        const results = await Promise.all(fetchPromises);

        //sonuçları tek bir dizide topla
        const allEpisodes = results.flatMap(result => result.results);

        //diziyi state'e kaydet
        setEpisodes(allEpisodes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEpisodes();
  }, []);

  const filteredEpisodes = episodes.filter(episode => {
    const episodeNameLowercase = episode.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const searchQueryLowercase = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return episodeNameLowercase.includes(searchQueryLowercase);
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EpisodeDetail', { characters: item.characters })}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.episode}>{item.episode}</Text>
        <Text style={styles.date}>{item.air_date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FlatList
        data={filteredEpisodes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#97D3C1',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  episode: {
    color: '#606060',
    fontWeight: 'bold',
    marginTop: 20
  },
  date: {
    textAlign: 'right',
    color: '#606060',
    fontWeight: 'bold',
    marginTop: -20
  },
  searchBar: {
    fontSize: 16,
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 4,
  },
});

export default Episodes;
