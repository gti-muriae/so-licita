import React, {useState} from "react";
import './login.css';
import Modal from "./Modal";
import '../.././styles.scss';

function Login(){
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <body>
            {isModalVisible ? <Modal onClose={() =>setIsModalVisible(false)} /> : null}
            <div class='container'>
                <div class='login-box'>
                    <div class='login-logo'>
                    </div>
                    <div class='label-float'>
                        <label for='usuario'>Usuário</label>
                        <input type='text' id='usuario' placeholder='E-mail' />
                    </div>
                    <div class='label-float'>
                        <label for='senha'>Senha</label>
                        <input type='password' id='senha' placeholder='Senha' />

                    </div>
                    <div class='justify-center'>
                        <button type="submit">Entrar</button>
                    </div>
                    <div class='justify-center'>
                    </div>
                    <p>Não tem uma conta? <a class='Mod' onClick={() => setIsModalVisible(true)} >Cadastre-se</a>
                    </p>
                </div>
            </div>
        </body>
    )
}

export default Login;