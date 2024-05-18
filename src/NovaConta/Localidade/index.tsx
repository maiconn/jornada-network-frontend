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
import {useNavigate} from "react-router-dom";
import EstadosField from "./Field/EstadosField.tsx";
import Link from "@mui/material/Link";
import CidadesField from "./Field/CidadesField.tsx";


function Localidade({dispatch}: DispatchProp) {
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
                            Sua Localização
                        </Typography>
                        <Form
                            onSubmit={onSubmit}
                            validate={validation}
                            render={({handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field name="uf" component={EstadosField}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field name="cidade" component={CidadesField}/>
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
                                    <Link href="/home">Preencher depois</Link>
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
export default connect(mapStateToProps)(Localidade)