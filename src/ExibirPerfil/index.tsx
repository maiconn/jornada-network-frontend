import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {PerfilContext} from "./context.tsx";
import React, {useContext, useEffect} from "react";
import Header from "../Header";
import Grid from "@mui/material/Grid";
import {convertStringToFoto} from "../Generic/functions.ts";
import {Card, Typography} from "@mui/material";
import {FitnessCenter} from "@mui/icons-material";
import {Footer} from "../Footer";


function ExibirPerfil() {

    const { _usuario } = useParams();
    const {findUsuario, usuario} = useContext(PerfilContext);



    useEffect(() => {
        findUsuario(_usuario);
    }, []);

    if(usuario == null) {
        return null;
    }

    return (
        <Grid>
            <Header />
            <Card>
                <Grid container spacing={2} sx={{
                    marginTop: 2,
                    display: 'flex',
                }}>
                    <Grid xs={4}>
                        <div style={{display: "flex", justifyContent: "center", marginTop: "1em"}}>
                            <img
                                className="perfil"
                                src={convertStringToFoto(usuario ? usuario.fotoPerfil : null)}
                                alt={usuario.nome}
                            />
                        </div>
                    </Grid>
                    <Grid xs={8}>
                        <Typography variant="body2">
                            @{usuario.usuario}
                            <br />
                            {`${usuario.qtdPostagens} posts   ${usuario.qtdSeguidores} seguidores   ${usuario.qtdSeguindo} seguindo`}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {usuario.nome}
                        </Typography>
                        <Typography variant="body2">
                            {usuario.bio}
                        </Typography>
                        <Typography variant="body2">
                            <FitnessCenter />
                            {usuario.habilidades ? usuario.habilidades.map(habilidade => habilidade.descricao).join(", ") : ''}
                        </Typography>
                        <Typography variant="body2">
                            Contatos:
                            <br/>
                            <br/>
                            {usuario.contatos ? usuario.contatos
                                .filter(contato => contato.descricao !== '' && contato.visivel == true)
                                .map(contato => (
                                        <>
                                            <Grid container spacing={2}>
                                                <Grid xs={4}>
                                                    {contato.descricaoContato}
                                                </Grid>
                                                <Grid xs={8}>
                                                    {contato.descricao}
                                                </Grid>
                                            </Grid>
                                            <br />
                                        </>
                                    )
                                ) : ''}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
            <Footer/>
        </Grid>
    );
}

export default connect()(ExibirPerfil);

