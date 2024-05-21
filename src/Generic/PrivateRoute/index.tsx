import {Navigate} from "react-router-dom";
import api from "../../api";
import {Notify} from "notiflix";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "../../store";

function PrivateRoute({dispatch, user,  children}: DispatchProp & any & any) {
    const token = localStorage.getItem('token');

    if (token) {
        api.defaults.headers.common['Authorization'] = token;
        if(!user || user.nome == '') {
            api.get('/autenticacao/usuario-logado', {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(resposta => dispatch({type: "SET_USER", user: resposta.data}));
        }
        return children;
    } else if (children) {
        Notify.warning('Favor logar-se no sistema!');
        return <Navigate to="/"/>;
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(PrivateRoute);