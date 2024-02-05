import React from 'react';
import { useDispatch } from 'react-redux';
import { Song, addSongAsync, fetchSongsAsync, updateSongAsync } from '../app/songsSlice';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

interface AddSongFormProps {
  song: Song;
  setSong: React.Dispatch<React.SetStateAction<Song>>;
}

const AddSongForm: React.FC<AddSongFormProps> = ({song, setSong}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss();

    if (submitting) {
      return;
    }
    setSubmitting(true);
    if (song._id?.length) {
      await dispatch(updateSongAsync({ id: song._id, updatedSong: song }));
    } else {
      await dispatch(addSongAsync(song));
    }
    await dispatch(fetchSongsAsync());
    setSubmitting(false);

    setSong({
      _id: '',
      title: '',
      artist: '',
      album: '',
      genre: '',
    });
    toast.success('Song added successfully!');
    navigate('/');
  };

  return (
    <Loading loading={submitting} description={"Saving song..."}>
      <StyledContainer>
        <h2>
          {song._id?.length ? 'Edit Song' : 'Add New Song'}
        </h2>
        <StyledForm onSubmit={handleSubmit}>
          <label htmlFor={"id_title"}>Title:</label>
          <StyledInput id={"id_title"}  type="text" name="title" value={song.title} onChange={handleChange} required />

          <label htmlFor={"id_artist"}>Artist:</label>
          <StyledInput id="id_artist"  type="text" name="artist" value={song.artist} onChange={handleChange} required />

          <label htmlFor={"id_album"}>Album:</label>
          <StyledInput id="id_album"  type="text" name="album" value={song.album} onChange={handleChange} required />

          <label htmlFor={"id_genre"}>Genre:</label>
          <StyledInput id="id_genre" type="text" name="genre" value={song.genre} onChange={handleChange} required />

          <StyledButton  type="submit">
            {song._id?.length ? 'Update Song' : 'Add Song'}
          </StyledButton>
        </StyledForm>
      </StyledContainer>
    </Loading>
  );
};

// Emotion styled components
const StyledContainer = styled.div`
  width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export default AddSongForm;
