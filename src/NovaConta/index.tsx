import Box from '@mui/material/Box';
import {connect, DispatchProp} from "react-redux";
import {RootState} from "../store";
import {Container, Typography} from '@mui/material';
import Header from "../Header";
import Grid from "@mui/material/Grid";
import {convertStringToFoto} from "../Generic/functions.ts";
import {Field, Form} from "react-final-form";
import NomeField from "./Field/NomeField.tsx";
import EmailField from "./Field/EmailField.tsx";
import SenhaField from "./Field/SenhaField.tsx";
import ConfirmarSenhaField from "./Field/ConfirmarSenhaField.tsx";
import FileField from "../Generic/FileField.tsx";
import Button from "@mui/material/Button";
import {Footer} from "../Footer";
import {criarUsuario, UsuarioForm, validation} from "./actions.ts";
import UsuarioField from "./Field/UsuarioField.tsx";
import BioField from "./Field/BioField.tsx";


function NovaConta({dispatch}: DispatchProp) {
    const onSubmit = async (values: Partial<UsuarioForm>) => {
        criarUsuario(dispatch, values);
    }
    return (
        <Grid>
            <Header hideMenu={true}/>
            <Box>
                <Container component="div" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Criar Usuário
                        </Typography>
                        <Form
                            onSubmit={onSubmit}
                            validate={validation}
                            render={({handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field name="nome" component={NomeField}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="email" component={EmailField}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="bio" component={BioField}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="usuario" component={UsuarioField}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="senha" component={SenhaField}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="confirmarSenha" component={ConfirmarSenhaField}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div style={{display: "flex", justifyContent: "center", marginTop: "0em"}}>
                                                <img
                                                    className="perfil"
                                                    src={convertStringToFoto(null)}
                                                />
                                            </div>
                                            <FileField name="files" style={{"position":"relative"}}/>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                    >
                                        Salvar
                                    </Button>
                                </form>
                            )}
                        />
                    </Box>
                    <Footer sx={{mt: 5}}/>
                </Container>
            </Box>
        </Grid>
    );
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})
export default connect(mapStateToProps)(NovaConta)