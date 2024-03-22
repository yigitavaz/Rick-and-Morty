import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadFavoritesAsync = createAsyncThunk(
    'favorites/loadFavorites',
    async () => {
        const favorites = await AsyncStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    }
);

export const addFavoriteAsync = createAsyncThunk(
    'favorites/addFavorite',
    async (character) => {
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArr = favorites ? JSON.parse(favorites) : [];
        favoritesArr.push(character);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArr));
        return character;
    }
);

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadFavoritesAsync.fulfilled, (state, action) => action.payload)
            .addCase(addFavoriteAsync.fulfilled, (state, action) => {
                state.push(action.payload);
            });
    },
});

export default favoritesSlice.reducer;
