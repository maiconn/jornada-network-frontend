import Header from "../Header";
import Grid from "@mui/material/Grid";
import {Footer} from "../Footer";
import {convertStringToFoto} from "../Generic/functions.ts";
import {Card, IconButton, Typography} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import {FitnessCenter} from "@mui/icons-material";
import React from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";


function ExibirPerfil() {

    const { usuario } = useParams();

    console.log(usuario);

    return "";

    // return (
    //     <Grid>
    //         <Header />
    //         <Card>
    //             <Grid container spacing={2} sx={{
    //                 marginTop: 2,
    //                 display: 'flex',
    //             }}>
    //                 <Grid xs={4}>
    //                     <div style={{display: "flex", justifyContent: "center", marginTop: "1em"}}>
    //                         <img
    //                             className="perfil"
    //                             src={convertStringToFoto(user ? user.fotoPerfil : null)}
    //                             alt={user.nome}
    //                         />
    //                     </div>
    //                 </Grid>
    //                 <Grid xs={8}>
    //                     <Typography variant="body2">
    //                         @{user.usuario}
    //                         <IconButton aria-label="delete" onClick={() => navigate("/edit-profile")}>
    //                             <SettingsIcon />
    //                         </IconButton>
    //                         <br />
    //                         {`${user.qtdPostagens} posts   ${user.qtdSeguidores} seguidores   ${user.qtdSeguindo} seguindo`}
    //                     </Typography>
    //                     <Typography variant="h5" component="div">
    //                         {user.nome}
    //                     </Typography>
    //                     <Typography variant="body2">
    //                         {user.bio}
    //                     </Typography>
    //                     <Typography variant="body2">
    //                         <FitnessCenter />
    //                         {user.habilidades ? user.habilidades.map(habilidade => habilidade.descricao).join(", ") : ''}
    //                     </Typography>
    //                     <Typography variant="body2">
    //                         Contatos:
    //                         <br/>
    //                         <br/>
    //                         {user.contatos ? user.contatos
    //                             .filter(contato => contato.descricao !== '' && contato.visivel == true)
    //                             .map(contato => (
    //                                     <>
    //                                         <Grid container spacing={2}>
    //                                             <Grid xs={4}>
    //                                                 {contato.descricaoContato}
    //                                             </Grid>
    //                                             <Grid xs={8}>
    //                                                 {contato.descricao}
    //                                             </Grid>
    //                                         </Grid>
    //                                         <br />
    //                                     </>
    //                                 )
    //                             ) : ''}
    //                     </Typography>
    //                 </Grid>
    //             </Grid>
    //         </Card>export default connect()(ExibirPerfil);
    //         <Footer/>
    //     </Grid>
    // );
}

export default connect()(ExibirPerfil);

