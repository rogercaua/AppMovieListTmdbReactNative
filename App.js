import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';

const API_KEY = '860d240af05f1e0def8cda208fc17771';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`;
    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  const renderMovie = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image
        source={{ uri: `${IMG_BASE_URL}${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieOverview}>{item.overview}</Text>
      <Text style={styles.movieYear}>
        <Text style={styles.boldText}>Ano:</Text> {item.release_date ? item.release_date.split('-')[0] : 'N/A'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do filme..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Buscar" onPress={fetchMovies} color="#1E90FF" />
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', 
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: '#fff', 
    backgroundColor: '#333', 
  },
  movieContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 10,
  },
  movieImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', 
  },
  movieOverview: {
    color: '#ddd', 
  },
  movieYear: {
    color: '#fff', 
  },
  boldText: {
    fontWeight: 'bold',
    color: '#fff', 
  },
});

export default App;
