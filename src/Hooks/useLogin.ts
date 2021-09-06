import { userLogin } from "../Services/userLogin.service";

interface HookType {
    onLoginSubmit: () => Promise<void>;
}

interface FormStateType {
    login: string;
    password: string;
}

export const useLogin = ( formState: FormStateType,
                          handleSuccess: (redirectUrl: string) => void,
                          handleFailure: (loginRes: { status: number; data: string }) => void,) => {

    const onLoginSubmit = async () => {
        const loginRes = await userLogin(formState);
        if (loginRes.status === 200) {
            const fullUser = {
                ...loginRes.data.user,
                token: loginRes.data.token,
            };
            localStorage.setItem('user', JSON.stringify(fullUser));
            handleSuccess('/catalog');
        } else if (loginRes.status === 400) {
            handleFailure(loginRes);
        } else {
            handleFailure(loginRes);
        }
    };

    return { onLoginSubmit };
}
