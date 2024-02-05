import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Song, deleteSongAsync, fetchSongsAsync } from '../app/songsSlice';
import { RootState } from '../app/rootReducer'
import { AppDispatch } from '../app/store';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SongTableProps {
}

const SongTable: React.FC<SongTableProps> = ({}) => {
    const dispatch: AppDispatch = useDispatch(); 
    const songs = useSelector((state: RootState) => state.songs.songs);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchText, setSearchText] = React.useState<string>('');
  

    const handleUpdateSong = async (id: string) => {
      navigate(`/edit/${id}`);
    };
  
    const handleDeleteSong = async (id: string) => {
      await dispatch(deleteSongAsync(id));
      await dispatch(fetchSongsAsync());
      toast.success('Song Deleted successfully!');
    };

    const filterSongs = (song: Song) => {
      let success = true;
      if (searchParams.has('album')) {
        success &&= song.album === searchParams.get('album');
      }
      if (searchParams.has('artist')) {
        success &&= song.artist === searchParams.get('artist');
      }
      if (searchParams.has('genre')) {
        success &&= song.genre === searchParams.get('genre');
      }
      if (searchText) {
        success &&= song.title.toLowerCase().includes(searchText.toLowerCase());
      }

      return success;
    }
  

    return (
      <StyledContainer>
        <h2>Song Table</h2>
        <StyledInput type="text" placeholder="Search by title" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <StyledTable>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(songs) ? (
              songs
              .filter(filterSongs)
              .map((song) => (
                <tr key={song.title}>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.album}</td>
                  <td>{song.genre}</td>
                  <td>
                  <button onClick={() => handleUpdateSong(song._id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteSong(song._id)}>
                    Delete
                  </button>
                </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            )}
          </tbody>
          </StyledTable>
          </StyledContainer>
    );
  };

  // Emotion styled components
const StyledContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f5f5f5;
  }
  button {
    margin-right: 5px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export default SongTable;
