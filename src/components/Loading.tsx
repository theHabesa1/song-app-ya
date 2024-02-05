import styled from "@emotion/styled";
import React from "react";

interface LoadingProps {
    loading: boolean;
    description?: string;
    children: React.ReactNode | React.ReactNode[];
}

const Loading: React.FC<LoadingProps> = ({ loading, children, description }) => {

    if (loading) {
        return <StyledLoading>
            <div className={"spinner"} />
            {description && <p>{description}</p>}
        </StyledLoading>;
    }

    return <>{children}</>;
};

const StyledLoading = styled.div`
    // create a loading spinner
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .spinner {
        border: 6px solid #ccc;
        border-top: 6px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

`;

export default Loading;