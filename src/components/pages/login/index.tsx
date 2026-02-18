import { InputField } from "../../index";
import { useForm } from "react-hook-form";
import { LoginFormInput } from "../../../interafaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from "../../../validations";
import styles from './styles.module.scss';
import logo from '../../../images/logo.svg';
import { classNames } from "../../../utils";
import { FaLock, FaEnvelope } from "react-icons/fa6";
import { useState } from "react";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormInput>({
        resolver: zodResolver(loginValidation)
    });

    const [passwordRef, setPasswordRef] = useState<HTMLElement | null>(null);
    // const [emailRef, setEmailRef] = useState<HTMLElement | null>(null);
    // const labelWidth = '6rem';

    console.log(passwordRef);

    const onsubmit = (data: LoginFormInput) => {
        console.log(data);
    }

    return <div data-component={'login'} className={classNames(styles.Login, 'translate-fixed-center gap-1')}>
        <div className={classNames(styles.Logo, 'align-content-center')}>
            <img src={logo} className="m-1" alt="logo" width={150}/>
        </div>
        <div className={'display-flex flex-direction-column gap-1 p-1 pl-0'}>
            <h3 className={'m-0 mb-1'}>Login</h3>
            <form
                className={'display-flex flex-direction-column gap-1'}
                onSubmit={handleSubmit(onsubmit)}
            >
                <div className={'display-flex'}>
                    < InputField
                        // setRef={setEmailRef}
                        // labelWith={labelWidth}
                        // label={'Email'}
                        icon={FaEnvelope}
                        className={classNames(styles.Email)}
                        fieldRegister={register('email')}
                        placeHolder={'Email'}
                        error={errors.email?.message}/>
                </div>
                <div className={'display-flex'}>
                    <InputField
                        setRef={setPasswordRef}
                        // labelWith={labelWidth}
                        // label={'Password'}
                        icon={FaLock}
                        type={'password'}
                        className={classNames(styles.Password)}
                        fieldRegister={register('password')}
                        placeHolder={'Password'}
                        error={errors.password?.message}/>
                </div>
                <button type={'submit'} className={'btn btn-primary mt-1'}>Login</button>
            </form>
        </div>
    </div>
}

export default Login;