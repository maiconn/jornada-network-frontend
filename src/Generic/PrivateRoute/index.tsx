import {Navigate} from "react-router-dom";
import api from "../../api";
import {Notify} from "notiflix";
import {connect} from "react-redux";

export function PrivateRoute({children}: any) {
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common['Authorization'] = token;
        return children;
    } else if (children) {
        Notify.warning('Favor logar-se no sistema!');
        return <Navigate to="/"/>;
    }
}

export default connect()(PrivateRoute);