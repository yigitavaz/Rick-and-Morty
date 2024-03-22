import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CharactersDetails = ({ route }) => {
  const { character } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text style={styles.text}>Name - {character.name}</Text>
        <Text style={styles.text}>Status - {character.status}</Text>
        <Text style={styles.text}>Species - {character.species}</Text>
        <Text style={styles.text}>Gender - {character.gender}</Text>
        <Text style={styles.text}>Origin - {character.origin.name}</Text>
        <Text style={styles.text}>Location - {character.location.name}</Text>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    width: 350,
    justifyContent: 'center',
    backgroundColor: '#97D3C1',
    alignItems: 'center',
    padding: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white'
  },
  image: {
    width: 230,
    height: 230,
    borderRadius: 4,
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#ffffff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ffffff',
    padding: 5,

  },
});

export default CharactersDetails;
