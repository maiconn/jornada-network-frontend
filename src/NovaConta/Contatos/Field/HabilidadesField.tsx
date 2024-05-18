import {NovoUsuarioContext} from "../../context.tsx";
import {useContext} from "react";

function ContatosField() {
    const {contatos, novosContatos} = useContext(NovoUsuarioContext);
    contatos?.map(contato => {
        novosContatos.push({
            idContato: contato.idContato,
            descricaoContato: contato.descricao,
            descricao: "",
            visivel: true,
        })
    });
    console.log(novosContatos)

    return (
        <>

        </>
    );
}

export default ContatosField;