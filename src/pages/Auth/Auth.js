
import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react'
import instaclone from "../../assets/png/instaclone.png"
import "./Auth.scss"
import RegisterForm from "../../components/Auth/RegisterForm"

export default function Auth() {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <Container fluid className="auth">
            <Image src={instaclone} />
            <div className="container-form">
                {showLogin ? <p>Formulario de Login</p> : <RegisterForm />}
            </div>
            <div className="change-form">
                <p>
                    {showLogin ? (
                        <>
                            ¿No tienes cuenta?
                        <span onClick={() => setShowLogin(!showLogin)}>Regístrate</span>
                        </>
                    ) : (<>
                        Entra con tu cuenta.
                    <span onClick={() => setShowLogin(!showLogin)}>Iniciar Sesión</span>
                    </>)}
                </p>
            </div>
        </Container >
    )
}