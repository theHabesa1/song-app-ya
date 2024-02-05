import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface SongsState {
  songs: Song[];
  albumCounts: {
    [key: string]: number;
  }
  genreCounts: {
    [key: string]: number;
  }
  artistCounts: {
    [key: string]: {
      totalSongs: number;
      totalAlbums: number;
    }
  }
  totalSongs: number;
  totalAlbums: number;
  totalArtists: number;
  totalGenres: number;
}

const initialState: SongsState = {
  songs: [],
  albumCounts: {},
  genreCounts: {},
  artistCounts: {},
  totalSongs: 0,
  totalAlbums: 0,
  totalArtists: 0,
  totalGenres: 0,
};

// In songsSlice.ts
export const addSongAsync = createAsyncThunk(
  'songs/addSong',
  async (newSong: Song) => {
    const response = await axios.post('https://song-back-addis.onrender.com/songs/add', {...newSong, _id: undefined});
    console.log({ response });
    return { songs: response.data }; 
  }
);

// Async thunk for updating a song by ID
export const updateSongAsync = createAsyncThunk(
  'songs/updateSong',
  async ({ id, updatedSong }: { id: string; updatedSong: Song }) => {
    const response = await axios.put(`https://song-back-addis.onrender.com/songs/${id}`, updatedSong);
    return { songs: response.data };
  }
);

// Async thunk for deleting a song by ID
export const deleteSongAsync = createAsyncThunk(
  'songs/deleteSong',
  async (id: string) => {
    const response = await axios.delete(`https://song-back-addis.onrender.com/songs/${id}`);
    return { songs: response.data };
  }
);


export const fetchSongsAsync = createAsyncThunk('songs/fetchSongs', async () => {
  const response = await axios.get('https://song-back-addis.onrender.com/songs');
  return response.data;
});

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
      setSongs: (state, action: PayloadAction<Song[]>) => {
        state.songs = action.payload;
      },
      addSong: (state, action: PayloadAction<Song>) => {
        state.songs.push(action.payload);
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchSongsAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      });

      builder.addCase(addSongAsync.fulfilled, (state, action) => {
        state.songs = action.payload.songs;
      });
       // Handle the updateSongAsync and deleteSongAsync actions
    builder.addCase(updateSongAsync.fulfilled, (state, action) => {
      state.songs = action.payload.songs;
    });

    builder.addCase(deleteSongAsync.fulfilled, (state, action) => {
      state.songs = action.payload.songs;
    });
    },
  });
  
  export const { setSongs, addSong } = songsSlice.actions;
  export default songsSlice.reducer;
  
