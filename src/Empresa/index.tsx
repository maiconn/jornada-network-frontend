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
import {EmpresaConsumer, EmpresaProvider} from "./context";
import NomeField from "./Fields/NomeField.tsx";
import AlertDialog from "../Generic/AlertDialog";
import CNPJField from "./Fields/CNPJField.tsx";
import Button from "@mui/material/Button";
import EmailField from "./Fields/EmailField.tsx";

function Empresa() {

    const [open, setOpen] = useState(false);

    return (
        <EmpresaProvider>
            <EmpresaConsumer>
                {
                    ({setEmpresa, empresa, empresas, salvar, remover}) => (<>
                        <AlertDialog informationText={"Deseja realmente remover a empresa?"}
                                     yesFunction={() => {
                                         remover(empresa!.idEmpresa);
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
                                    Empresa
                                </Typography>

                                <Box sx={{mt: 3, width: '100%'}}>
                                    <Form
                                        onSubmit={salvar}
                                        validate={validation}
                                        initialValues={{
                                            ...empresa
                                        }}
                                        render={({handleSubmit, invalid}) => (
                                            <form onSubmit={handleSubmit}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Field name="nome" component={NomeField}/>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field name="cnpj" component={CNPJField}/>
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
                                                            {empresa && empresa.idEmpresa !== 0 ?
                                                                <Button
                                                                    fullWidth
                                                                    variant="contained"
                                                                    sx={{mt: 1, mb: 1}}
                                                                    onClick={() => {
                                                                        setEmpresa({idEmpresa: 0});
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
                                            <TableCell style={{width: "10%"}}>CNPJ</TableCell>
                                            <TableCell style={{width: "10%"}}>E-mail</TableCell>
                                            <TableCell align="center" style={{width: "10%"}}>Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!empresas || empresas.length === 0 ?
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
                                            empresas.map((_empresa: any) => (
                                                <TableRow
                                                    key={_empresa.idEmpresa}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell>{_empresa.idEmpresa}</TableCell>
                                                    <TableCell>{_empresa.nome}</TableCell>
                                                    <TableCell>{_empresa.cnpj}</TableCell>
                                                    <TableCell>{_empresa.usuario.email}</TableCell>
                                                    <TableCell align="center">
                                                        <Box>
                                                            <Grid container>
                                                                <Grid xs={6}>
                                                                    <Tooltip title="Editar">
                                                                        <IconButton aria-label="delete"
                                                                                    color="primary"
                                                                                    onClick={() => {
                                                                                        setEmpresa(_empresa);
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
                                                                                        setEmpresa(_empresa);
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
            </EmpresaConsumer>
        </EmpresaProvider>
    );
}

export default Empresa;