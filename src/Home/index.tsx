import Header from "../Header";
import {connect} from "react-redux";


function Home() {

    return (
        <>
            <Header/>
            <p>Bem vindo ao Jornada!</p>
        </>
    );
}

export default connect()(Home);