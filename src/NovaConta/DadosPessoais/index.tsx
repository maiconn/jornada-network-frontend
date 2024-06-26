import Box from '@mui/material/Box';
import {connect, DispatchProp} from "react-redux";
import {RootState} from "../../store";
import {Container, Typography} from '@mui/material';
import Header from "../../Header";
import Grid from "@mui/material/Grid";
import {Field, Form} from "react-final-form";
import Button from "@mui/material/Button";
import {Footer} from "../../Footer";
import {criarDadosPessoais, UsuarioDadosPessoaisForm, validation} from "./actions.ts";
import BioField from "./Field/BioField.tsx";
import {useNavigate} from "react-router-dom";
import HabilidadesField from "./Field/HabilidadesField.tsx";
import {NovoUsuarioProvider} from "../context.tsx";
import Link from "@mui/material/Link";


function NovaContaDadosPessoais({dispatch}: DispatchProp) {
    const navigate = useNavigate();
    const onSubmit = async (values: Partial<UsuarioDadosPessoaisForm>) => {
        criarDadosPessoais(dispatch, values, navigate);
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
                            Dados Pessoais
                        </Typography>
                        <Form
                            onSubmit={onSubmit}
                            validate={validation}
                            render={({handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field name="bio" component={BioField}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <NovoUsuarioProvider>
                                                <Field name="habilidades" component={HabilidadesField}/>
                                            </NovoUsuarioProvider>
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
                                    <Link href="/nova-conta-contatos">Preencher depois</Link>
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
export default connect(mapStateToProps)(NovaContaDadosPessoais)