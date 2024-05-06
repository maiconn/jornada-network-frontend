import * as yup from 'yup';

export interface PersonalForm {
    idPersonal: number;
    nome: string;
    cpfCnpj: string;
    email: string;
}
const schema = yup.object().shape({
    nome: yup.string()
        .required('Campo Obrigatório!'),
    cpfCnpj: yup.string()
        .required('Campo Obrigatório!'),
    email: yup.string()
        .required('Campo Obrigatório!'),
});

export const validation = async (values: Partial<PersonalForm>) => {
    return schema
        .validate(values, {abortEarly: false})
        .then(() => undefined)
        .catch((error: yup.ValidationError) => {
            if (Array.isArray(error.inner)) {
                return error.inner.reduce((acc, cur) => {
                    return {
                        ...acc,
                        [cur.path || '']: cur.message,
                    };
                }, {});
            }
        });
};
