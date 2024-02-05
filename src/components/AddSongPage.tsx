import React from "react";
import AddSongForm from "./AddSongForm";

const AddSongPage: React.FC = () => {
    const [song, setSong] = React.useState({
        _id: '',
        title: '',
        artist: '',
        album: '',
        genre: '',
    });

    return <AddSongForm song={song} setSong={setSong} />;
}

export default AddSongPage;