import './App.css'
import Login from "./Login";
import {Route} from "react-router";
import {BrowserRouter, Routes} from "react-router-dom";
import Home from "./Home";
import PrivateRoute from "./Generic/PrivateRoute";
import EditProfile from "./EditProfile";
import Empresa from "./Empresa";
import Personal from "./Personal";
import NovaContaDadosPrincipais from "./NovaConta/DadosPrincipais";
import NovaContaDadosPessoais from "./NovaConta/DadosPessoais";
import NovaContaContatos from "./NovaConta/Contatos";
import {NovoUsuarioProvider} from "./NovaConta/context.tsx";
import Localidade from "./NovaConta/Localidade";
import {LocalidadeProvider} from "./NovaConta/Localidade/context.tsx";
import ExibirPerfil from "./ExibirPerfil";
import {PerfilProvider} from "./ExibirPerfil/context.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/perfil/:_usuario" element={
                    <PerfilProvider>
                        <ExibirPerfil/>
                    </PerfilProvider>
                }/>
                <Route path="/nova-conta" element={<NovaContaDadosPrincipais/>}/>
                <Route path="/nova-conta-dados-pessoais" element={
                    <PrivateRoute>
                        <NovaContaDadosPessoais/>
                    </PrivateRoute>
                }/>
                <Route path="/nova-conta-contatos" element={
                    <PrivateRoute>
                        <NovoUsuarioProvider>
                            <NovaContaContatos/>
                        </NovoUsuarioProvider>
                    </PrivateRoute>
                }/>
                <Route path="/nova-conta-localidade" element={
                    <PrivateRoute>
                        <LocalidadeProvider>
                            <Localidade/>
                        </LocalidadeProvider>
                    </PrivateRoute>
                }/>
                <Route path="/home" element={
                    <PrivateRoute>
                        <Home/>
                    </PrivateRoute>
                }/>
                <Route path="/edit-profile" element={
                    <PrivateRoute>
                        <EditProfile/>
                    </PrivateRoute>}/>
                <Route path="/empresa" element={
                    <PrivateRoute>
                        <Empresa/>
                    </PrivateRoute>}/>
                <Route path="/personal" element={
                    <PrivateRoute>
                        <Personal/>
                    </PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
