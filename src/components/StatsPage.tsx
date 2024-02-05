import React from "react";
import { RootState } from "../app/rootReducer";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const StatsPage: React.FC = () => {
    const state = useSelector((state: RootState) => state.songs);
    const navigate = useNavigate();

    const handleFilterSongs = (by: string, value: string) => {
        navigate(`/songs?${by}=${value}`);
    }
    
    
    

    return (
        <StyledContainer>
            <div>
                <h2>Albums</h2>
                <StyledGrid>
                    {Object.keys(state.albumCounts).map((album) => {
                        return (
                            <StyledCard key={album}>
                                <h3>{album}</h3>

                                <div>Songs: <strong>{state.albumCounts[album]}</strong></div>

                                <StyledExploreButton onClick={() => handleFilterSongs('album', album)}>
                                    Explore
                                </StyledExploreButton>
                            </StyledCard>
                        );
                    }
                    )}
                </StyledGrid>
            </div>

            <div>
                <h2>Artists</h2>
                <StyledGrid>
                    {Object.keys(state.artistCounts).map((artist) => {
                        return (
                            <StyledCard key={artist}>
                                <h3>{artist}</h3>

                                <div>Songs: <strong>{state.artistCounts[artist].totalSongs}</strong></div>
                                <div>Albums: <strong>{state.artistCounts[artist].totalAlbums}</strong></div>

                                <StyledExploreButton onClick={() => handleFilterSongs('artist', artist)}>
                                    Explore
                                </StyledExploreButton>
                            </StyledCard>
                        );
                    }
                    )}
                </StyledGrid>
            </div>

            <div>
                <h2>Genres</h2>
                <StyledGrid>
                    {Object.keys(state.genreCounts).map((genre) => {
                        return (
                            <StyledCard key={genre}>
                                <h3>{capitalize(genre)}</h3>

                                <div>Songs: <strong>{state.genreCounts[genre]}</strong></div>

                                <StyledExploreButton onClick={() => handleFilterSongs('genre', genre)}>
                                    Explore
                                </StyledExploreButton>
                            </StyledCard>
                        );
                    }
                    )}
                </StyledGrid>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    width: 100%;
    max-width: 80%;
    margin: 0 auto;
    padding: 2rem;
`


const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
`

const StyledCard = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    `;  

const StyledExploreButton = styled.button`
// rest of the styles
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 3px;
    cursor: pointer;

`

export default StatsPage;