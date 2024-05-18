import {connect, DispatchProp} from "react-redux";
import {Card, Typography} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import {RootState} from "../store";
import {convertStringToFoto} from "../Generic/functions.ts";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {FitnessCenter} from "@mui/icons-material";


function Perfil({user, dispatch}: any & DispatchProp) {
    console.log(user);
    if (!user) {
        return null;
    }
    return (
        <Card>
            <Grid container spacing={2} sx={{
                marginTop: 2,
                display: 'flex',
            }}>
                <Grid xs={4}>
                    <div style={{display: "flex", justifyContent: "center", marginTop: "1em"}}>
                        <img
                            className="perfil"
                            src={convertStringToFoto(user ? user.fotoPerfil : null)}
                            alt={user.nome}
                        />
                    </div>
                </Grid>
                <Grid xs={8}>
                    <Typography variant="body2">
                        @{user.usuario}
                        <br />
                        {`${user.qtdPostagens} posts   ${user.qtdSeguidores} seguidores   ${user.qtdSeguindo} seguindo`}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {user.nome}
                    </Typography>
                    <Typography variant="body2">
                        {user.bio}
                    </Typography>
                    <Typography variant="body2">
                        <FitnessCenter />
                        {user.habilidades.map(habilidade => habilidade.descricao).join(", ")}
                    </Typography>
                    <Typography variant="body2">
                        Contatos:
                        <br/>
                        <br/>
                        {user.contatos
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
                            )}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Perfil);