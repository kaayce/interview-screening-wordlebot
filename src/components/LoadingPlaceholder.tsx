import React from "react";
import { Container, Skeleton } from "@mui/material";

const LoadingPlaceholder = () => {
    return (
        <Container maxWidth="sm">
            {[...Array(3)].map((e, i) => (
                <Skeleton key={i} height={70} />
            ))}
        </Container>
    );
};

export default LoadingPlaceholder;
