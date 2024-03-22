import React from 'react';
import { Provider } from 'react-redux'; // Redux Provider'ını import edin
import { store } from './src/app/store'; // Redux store'unuzun yolunu düzeltin
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Screens/Home/Home';
import Episodes from './src/Screens/Episodes/Episodes';
import Favorites from './src/Screens/Favorites/Favorites';
import EpisodeDetail from './src/Screens/Episodes/EpisodeDetail';
import CharacterDetails from './src/Screens/Characters/CharactersDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ title: 'ANA SAYFA', headerTitleAlign: 'center', }} />
            <Stack.Screen name="Episodes" component={Episodes} options={{ title: 'BÖLÜMLER', headerTitleAlign: 'center', }} />
            <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'FAVORİ KARAKTERLER', headerTitleAlign: 'center', }} />
            <Stack.Screen name="EpisodeDetail" component={EpisodeDetail} options={{ title: 'KARAKTERLER', headerTitleAlign: 'center' }} />
            <Stack.Screen name="CharacterDetails" component={CharacterDetails} options={({ route }) => ({ title: route.params.character.name, headerTitleAlign: 'center' })} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
