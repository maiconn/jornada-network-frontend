import Box from '@mui/material/Box';
import {connect, DispatchProp} from "react-redux";
import {RootState} from "../../store";
import {Container, Switch, TextField, Typography} from '@mui/material';
import Header from "../../Header";
import Grid from "@mui/material/Grid";
import {Field, Form} from "react-final-form";
import Button from "@mui/material/Button";
import {Footer} from "../../Footer";
import {criarContatos, UsuarioDadosPessoaisForm, validation} from "./actions.ts";
import {useNavigate} from "react-router-dom";
import {NovoUsuarioContext} from "../context.tsx";
import {FieldArray} from "react-final-form-arrays";
import arrayMutators from 'final-form-arrays'
import {useContext} from "react";


function NovaContaContatos({dispatch}: DispatchProp) {
    const navigate = useNavigate();
    const onSubmit = async (values: Partial<UsuarioDadosPessoaisForm>) => {
        criarContatos(dispatch, values, navigate);
    }
    const {novosContatos} = useContext(NovoUsuarioContext);

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
                            Contatos
                        </Typography>
                        <Form
                            onSubmit={onSubmit}
                            validate={validation}
                            initialValues={{
                                contatos: novosContatos
                            }}
                            mutators={{
                                ...arrayMutators,
                            }}

                            render={({
                                         handleSubmit,

                                     }) => (
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={10}>
                                                    URL
                                                </Grid>
                                                <Grid item xs={2}>
                                                    Visível
                                                </Grid>
                                            </Grid>
                                            <FieldArray name="contatos">
                                                {({fields}) =>
                                                    fields.map((name, index) => (
                                                        <div key={name}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={10}  style={{marginTop: "15px"}}>
                                                                    <Field
                                                                        component="input"
                                                                        name={`${name}.descricao`}
                                                                    >
                                                                        {({input}) =>
                                                                            <TextField {...input}
                                                                                       label={novosContatos[index].descricaoContato}
                                                                                       type="text"/>}
                                                                    </Field>
                                                                </Grid>
                                                                <Grid item xs={2} style={{marginTop: "20px"}}>
                                                                    <Field
                                                                        component="input"
                                                                        name={`${name}.visivel`}
                                                                    >
                                                                        {({input}) =>
                                                                            <Switch {...input} defaultChecked
                                                                            />
                                                                        }
                                                                    </Field>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    ))
                                                }
                                            </FieldArray>
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
export default connect(mapStateToProps)(NovaContaContatos)