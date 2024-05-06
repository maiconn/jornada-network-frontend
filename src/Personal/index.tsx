import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Footer} from "../Footer";
import {Field, Form} from 'react-final-form'
import {Delete, Edit, People} from "@mui/icons-material";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import Header from "../Header";
import {validation} from "./actions";
import {PersonalConsumer, PersonalProvider} from "./context";
import NomeField from "./Fields/NomeField.tsx";
import AlertDialog from "../Generic/AlertDialog";
import CPFCNPJField from "./Fields/CPFCNPJField.tsx";
import Button from "@mui/material/Button";
import EmailField from "./Fields/EmailField.tsx";

function Personal() {

    const [open, setOpen] = useState(false);

    return (
        <PersonalProvider>
            <PersonalConsumer>
                {
                    ({setPersonal, personal, personals, salvar, remover}) => (<>
                        <AlertDialog informationText={"Deseja realmente remover o personal?"}
                                     yesFunction={() => {
                                         remover(personal!.idPersonal);
                                     }}
                                     open={open}
                                     setOpen={setOpen}/>

                        <Header/>
                        <Container component="div" maxWidth="md">
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                    <People/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Personal
                                </Typography>

                                <Box sx={{mt: 3, width: '100%'}}>
                                    <Form
                                        onSubmit={salvar}
                                        validate={validation}
                                        initialValues={{
                                            ...personal
                                        }}
                                        render={({handleSubmit, invalid}) => (
                                            <form onSubmit={handleSubmit}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Field name="nome" component={NomeField}/>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field name="cpfCpnj" component={CPFCNPJField}/>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field name="email" component={EmailField}/>
                                                    </Grid>
                                                </Grid>
                                                <Box sx={{flexGrow: 1}}>
                                                    <Grid container>
                                                        <Grid xs={6}>
                                                            <Button
                                                                type="submit"
                                                                fullWidth
                                                                variant="contained"
                                                                sx={{mt: 1, mb: 1}}
                                                                disabled={invalid}
                                                            >
                                                                Salvar
                                                            </Button>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            {personal && personal.idPersonal !== 0 ?
                                                                <Button
                                                                    fullWidth
                                                                    variant="contained"
                                                                    sx={{mt: 1, mb: 1}}
                                                                    onClick={() => {
                                                                        setPersonal({idPersonal: 0});
                                                                    }}>
                                                                    Novo
                                                                </Button>
                                                                :
                                                                <></>
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </form>
                                        )}
                                    />
                                </Box>
                            </Box>
                            <TableContainer component={Paper}>
                                <Table sx={{}} size="medium" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{width: "10%"}}>Código</TableCell>
                                            <TableCell style={{width: "30%"}}>Nome</TableCell>
                                            <TableCell style={{width: "10%"}}>CPF/CNPJ</TableCell>
                                            <TableCell style={{width: "10%"}}>E-mail</TableCell>
                                            <TableCell align="center" style={{width: "10%"}}>Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!personals || personals.length === 0 ?
                                            <TableRow
                                                key={0}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell style={{width: "100%"}}
                                                           align="center"
                                                           colSpan={3}>
                                                    Nenhum registro cadastrado.
                                                </TableCell>
                                            </TableRow>
                                            :
                                            personals.map((_personal: any) => (
                                                <TableRow
                                                    key={_personal.idPersonal}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell>{_personal.idPersonal}</TableCell>
                                                    <TableCell>{_personal.nome}</TableCell>
                                                    <TableCell>{_personal.cpfCnpj}</TableCell>
                                                    <TableCell>{_personal.usuario.email}</TableCell>
                                                    <TableCell align="center">
                                                        <Box>
                                                            <Grid container>
                                                                <Grid xs={6}>
                                                                    <Tooltip title="Editar">
                                                                        <IconButton aria-label="delete"
                                                                                    color="primary"
                                                                                    onClick={() => {
                                                                                        setPersonal(_personal);
                                                                                    }}>
                                                                            <Edit/>
                                                                        </IconButton>
                                                                    </Tooltip>

                                                                </Grid>
                                                                <Grid xs={6}>
                                                                    <Tooltip title="Excluir">
                                                                        <IconButton aria-label="delete"
                                                                                    color="primary"
                                                                                    onClick={() => {
                                                                                        setPersonal(_personal);
                                                                                        setOpen(true);
                                                                                    }}
                                                                        >
                                                                            <Delete/>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Footer sx={{mt: 5}}/>
                        </Container>
                    </>)
                }
            </PersonalConsumer>
        </PersonalProvider>
    );
}

export default Personal;