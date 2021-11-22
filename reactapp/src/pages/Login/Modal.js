import React,{useState} from "react";


const Modal = ({onClose= () => {} }) => {

    return ( 
    <div className="modal">
        <div className="quadro">
            <div className="subtitulo1">Dados da Empresa</div>
            <form>
            <div className='form-modal'>
                <div>
                    <label className="form-label">CNPJ:</label>
                    <input type='text' id='CNPJ' placeholder='XX. XXX. XXX/0001-XX' />

                    <label className="form-label">Razão Social:</label>
                    <input type='text' id='NOME' placeholder='Razão Social' />
                </div>
                <div>
                    <label className="form-label">Telefone:</label>
                    <input type='tel' id='TEL' placeholder='(XX) XXXX-XXXX' />
                    <label className="form-label">Celular:</label>
                    <input type='tel' id='CEL' placeholder='(XX) XXXXX-XXXX' />
                </div>
            </div>
            <div className="subtitulo2">Dados do Aplicativo</div>
            <div className='form-modal'>
                <div>
                    <label className="form-label" for="EMAIL">E-Mail:</label>
                    <input type='text' id='EMAIL' placeholder='exemplo@email.com.br' />
                </div>
                <div>
                    <label className="form-label" for="SENHA">Senha:</label>
                    <input type='password' id='SENHA' placeholder='*********' />
                    <label className="form-label" for="SENHA2">Confirmar Senha:</label>
                    <input type='password' id='SENHA2' placeholder='*********' />
                </div>
            </div>
            </form>
                <div className="teste">
                    <div className="button2">
                        <button  onClick={onClose}>Voltar</button> 
                    </div>
                    <div className="button1">
                        <button type="submit" >Cadastrar</button>
                    </div>
                </div>                                    
        </div>
         
    </div>
    );
};

export default Modal ;