import React from "react";

import AddSongForm from "./AddSongForm";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { toast } from "react-toastify";

const EditSongPage: React.FC = () => {
    const [song, setSong] = React.useState({
        _id: '',
        title: '',
        artist: '',
        album: '',
        genre: '',
    });
    const { id } = useParams();
    const songs = useSelector((state: RootState) => state.songs.songs);
    const navigate = useNavigate();


    React.useEffect(() => {
        console.log('id', id);
        console.log('songs', songs);
        if (songs.length > 0) {
            const song = songs.find((song) => song._id === id);
            if (song) {
                setSong(song);
            } else {
                toast.error('Song not found!');
                navigate('/');
            }
        }
        
    }, [id, navigate, songs]);

    return <AddSongForm song={song} setSong={setSong} />;
}

export default EditSongPage;