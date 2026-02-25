import { FC } from 'react';
import Button from '../../partials/button';
import InputField from '../../partials/inputField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginValidation } from '../../../validations';
import styles from './styles.module.scss';
import logo from '../../../images/logo.svg';
import { classNames } from '../../../utils';
import { FaLock, FaEnvelope, FaUserLock } from 'react-icons/fa6';

export interface LoginFormInput {
    email: string;
    password: string;
}

const Login: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormInput>({
        resolver: zodResolver(loginValidation)
    });

    const onsubmit = (data: LoginFormInput) => {
        console.log('[onsubmit] data:', data);
    };

    return <div data-component={'login'}>
        <div className={classNames(styles.Login, 'translate fixed-center gap-1')}>
            <div className={classNames(styles.Logo, 'align-content-center')}>
                <img src={logo} className="m-1" alt="logo" width={150}/>
            </div>
            <div className={'display-flex flex-direction-column gap-1 p-1 pl-0'}>
                <h3 className={'m-0 mb-1'}>Login</h3>
                <form
                    className={'display-flex flex-direction-column gap-1'}
                    onSubmit={handleSubmit(onsubmit)}
                    noValidate
                >
                    <div className={'display-flex'}>
                        < InputField
                            type={'email'}
                            icon={FaEnvelope}
                            className={classNames(styles.Email)}
                            fieldRegister={register('email')}
                            placeHolder={'Email'}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className={'display-flex'}>
                        <InputField
                            icon={FaLock}
                            type={'password'}
                            className={classNames(styles.Password)}
                            fieldRegister={register('password')}
                            placeHolder={'Password'}
                            error={errors.password?.message}
                        />
                    </div>
                    <Button
                        align={'space-between'}
                        width={'50%'} icon={FaUserLock}
                        type={'submit'}
                        className={'align-self-end'}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    </div>;
};

export default Login;