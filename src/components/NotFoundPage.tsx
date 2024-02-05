import React from "react";

import styled from "@emotion/styled";

import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <StyledContainer>
        <h2>Page Not Found</h2>
        <p>
            <Link to="/">Go back to the main page</Link>
        </p>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    h2 {
        margin-bottom: 1rem;
        font-size: 2rem;
    }

    p {
        font-size: 1.2rem;

        a {
            background-color: #3498db;
            color: white;
            padding: .5rem 1rem;
            border-radius: 5px;
            transition: all .3s ease;

            &:hover {
                background-color: #2980b9;
            }
        }
    }
`;

export default NotFoundPage;