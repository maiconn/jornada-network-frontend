import {Notify} from "notiflix";

export const tratarErro = (error: any) => {
    if (!error.response || !error.response.data) {
        Notify.failure("Desculpe, o servidor está fora do ar, por favor tente novamente mais tarde.");
    // } else if (!error.response.data.error) {
        // Notify.failure("Requisição inválida no servidor.");
    } else if (error.response.status === 400) {
        Notify.failure(error.response.data.message);
    } else {
        Notify.failure(error);
    }
}

export const textRange = (value: string, limit: number) => {
    if (value.length > limit) {
        return value.slice(0, limit);
    }
    return value;
};

export const convertStringToFoto = (fotoBase64: string | null) => {
    if (fotoBase64) {
        return "data:image/png;base64," + fotoBase64;
    } else {
        return "https://cdn.iconscout.com/icon/premium/png-512-thumb/profile-1506810-1278719.png"
    }
}