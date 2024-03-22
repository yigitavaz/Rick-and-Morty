// SearchBar.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Arama yap..."
      placeholderTextColor="#949494"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  );
};



const styles = StyleSheet.create({
  searchBar: {
    fontSize: 16,
    backgroundColor: '#F4F4F4',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 4,
  },
});

export default SearchBar;
