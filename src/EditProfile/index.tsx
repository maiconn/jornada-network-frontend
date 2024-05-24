import Box from '@mui/material/Box';
import {connect, DispatchProp} from "react-redux";
import {RootState} from "../store";
import {Container, Switch, TextField, Typography} from '@mui/material';
import Header from "../Header";
import Grid from "@mui/material/Grid";
import {convertStringToFoto} from "../Generic/functions.ts";
import {Field, Form} from "react-final-form";
import FileField from "../Generic/FileField.tsx";
import Button from "@mui/material/Button";
import {Footer} from "../Footer";
import {atualizarUsuario, UsuarioForm, validation} from "./actions.ts";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UsuarioField from "../NovaConta/DadosPrincipais/Field/UsuarioField.tsx";
import BioField from "../NovaConta/DadosPessoais/Field/BioField.tsx";
import {NovoUsuarioProvider} from "../NovaConta/context.tsx";
import HabilidadesField from "../NovaConta/DadosPessoais/Field/HabilidadesField.tsx";
import {FieldArray} from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import EstadosField from "../NovaConta/Localidade/Field/EstadosField.tsx";
import CidadesField from "../NovaConta/Localidade/Field/CidadesField.tsx";
import {LocalidadeProvider} from "../NovaConta/Localidade/context.tsx";
import NomeField from "../NovaConta/DadosPrincipais/Field/NomeField.tsx";
import EmailField from "../NovaConta/DadosPrincipais/Field/EmailField.tsx";
import SenhaField from "../NovaConta/DadosPrincipais/Field/SenhaField.tsx";
import ConfirmarSenhaField from "../NovaConta/DadosPrincipais/Field/ConfirmarSenhaField.tsx";


function EditProfile({user, dispatch}: any & DispatchProp) {

    const onSubmit = async (values: Partial<UsuarioForm>) => {
        atualizarUsuario(dispatch, values);
    }

    return (
        <Grid>
            <Header />
            <Box sx={{width: '100%'}}>
                <Container component="div" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{display: "flex", justifyContent: "center", marginBottom: "1em"}}>
                            <img
                                className="perfil"
                                src={convertStringToFoto(user ? user.fotoPerfil : null)}
                                alt={user.nome}
                            />
                        </div>

                        <Form
                            onSubmit={onSubmit}
                            validate={validation}
                            mutators={{
                                ...arrayMutators,
                            }}
                            initialValues={user ?? {...user, senhaConfirm: user.senha}}
                            render={({handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <div>
                                            <Accordion defaultExpanded>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel1-content"
                                                    id="panel1-header"
                                                >
                                                    <Typography component="h1" variant="h6">
                                                        Dados Principais
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Field name="nome" component={NomeField}/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Field name="email" component={EmailField}/>
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
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel2-content"
                                                    id="panel2-header"
                                                >
                                                    <Typography component="h1" variant="h6">
                                                        Dados Pessoais
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
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
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel3-content"
                                                    id="panel3-header"
                                                >
                                                    <Typography component="h1" variant="h6">
                                                        Contatos
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
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
                                                                                                   label={user.contatos[index].descricaoContato}
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
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion defaultExpanded>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel1-content"
                                                    id="panel1-header"
                                                >
                                                    <Typography component="h1" variant="h6">
                                                        Localização
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <LocalidadeProvider>
                                                            <Grid item xs={12}>
                                                                <Field name="estado" component={EstadosField}/>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Field name="cidade" component={CidadesField}/>
                                                            </Grid>
                                                        </LocalidadeProvider>
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                        >
                                            Salvar
                                        </Button>
                                    </Grid>
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
export default connect(mapStateToProps)(EditProfile)