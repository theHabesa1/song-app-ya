import React, { useEffect } from "react";
import { fetchSongsAsync } from "./app/songsSlice";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { toast } from "react-toastify";
import Loading from "./components/Loading";
import styled from "@emotion/styled";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
    const [loading, setLoading] = React.useState<boolean>(false);

    useEffect(() => {
        console.log("Dispatching fetchSongsAsync...");
        setLoading(true);
        dispatch(fetchSongsAsync()).then(() => {
            setLoading(false);
        }).catch((error) => {
            toast.error(`Error: ${error}`);
            setLoading(false);
        } );
    }, [dispatch]);

    return (
        <div>
            <StyledHeaderWrapper>

                <StyledHeader>
                    <h1>
                        <Link to="/">Song-App-Ya</Link>
                    </h1>

                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/add">Add Song</Link>
                            </li>
                            <li>
                                <Link to="/stats">Stats</Link>
                            </li>
                        </ul>
                    </nav>
                </StyledHeader>
            </StyledHeaderWrapper>

            <StyledBody>
                <Loading loading={loading} description={"Getting songs..."}>
                    <Outlet />
                </Loading>
            </StyledBody>

            <StyledFooter>
                <p>© 2024 Yared Abera</p>
              
            </StyledFooter>
        </div>
    );
};

const StyledHeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 100;
    padding: .5rem 1rem;
    background-color: #f1f1f1;
    margin-bottom: 1rem;

`;

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    nav ul {
        display: flex;
        gap: 1rem;
        list-style: none;
    }
`;

const StyledBody = styled.main`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    min-height: 80vh;
`;

const StyledFooter = styled.footer`
    width: 100%;
    padding: 1rem;
    background-color: #f1f1f1;
    text-align: center;
`;

export default App;
