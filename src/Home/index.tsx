import Header from "../Header";
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import {Footer} from "../Footer";


function Home() {

    return (
        <Grid>
            <Header />
            <p>Bem vindo ao Jornada!</p>
            <Footer/>
        </Grid>
    );
}

export default connect()(Home);