import Header from "../Header";
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import {Footer} from "../Footer";
import Perfil from "../Perfil";


function Home() {

    return (
        <Grid>
            <Header />
            <Perfil />
            <Footer/>
        </Grid>
    );
}

export default connect()(Home);