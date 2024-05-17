import { Container } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Guess from "./components/Guess";

function App() {
    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                {/* Insert App here */}
                <Guess />
            </Container>
        </Layout>
    );
}

export default App;
