import React, { useState } from "react";
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loggedUser } from "../App";
import { useAtom } from 'jotai';

export default function RegisterPage() {
    const [user, setUser] = useAtom(loggedUser);
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState('');
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);

  const navigate = useNavigate();

    // Stati per la gestione degli errori
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Gestione del cambio numero di telefono
    const handlePhone = (e) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        setSubmitted(false);
        validatePhoneNumber(newPhone);
    };

    // Funzione di validazione del numero di telefono
    const validatePhoneNumber = (newPhone) => {
        const phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(newPhone)) {
            setPhoneError('Il numero di telefono deve contenere 10 numeri.');
        } else {
            setPhoneError('');
        }
    };

    // Gestione del cambio indirizzo email
    const handleMail = (e) => {
        setMail(e.target.value);
        setSubmitted(false);
    };

    // Gestione del cambio password
    const handlePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setSubmitted(false);
        validatePassword(newPassword);
    };

    // Gestione del cambio posizione Y
    const handlePositionY = (e) => {
        setPositionY(e.target.value);
        setSubmitted(false);
    };

    // Gestione del cambio posizione X
    const handlePositionX = (e) => {
        setPositionX(e.target.value);
        setSubmitted(false);
    };

    // Funzione di validazione della password
    const validatePassword = (newPassword) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setPasswordError(
                'La password deve contenere almeno una maiuscola, un carattere speciale e un numero.'
            );
        } else {
            setPasswordError('');
        }
    };

    // Gestione dell'invio del modulo
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se i campi obbligatori sono compilati e se la password è valida
        if (mail === "" || password === "" || passwordError !== "" || phoneError !== "") {
            setError(true);
        } else {
            try {
                // Effettua la chiamata API per registrare l'utente
                const response = await axios.post('/users/register', {
                    mail,
                    password,
                    phone,
                    positionX,
                    positionY
                });

                // Verifica lo stato della risposta e aggiorna lo stato di conseguenza
                if (response.data && response.status === 201) {
                    setUser(response.data);
                    setSubmitted(true);
                    setError(false);
                    navigate("/");
                }
            } catch (error) {
                setError(true);
            }
        }
    };

    // Mostra il messaggio di successo
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>Utente {mail} registrato con successo!</h1>
            </div>
        );
    };

    // Mostra il messaggio di errore se error è true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Si prega di compilare tutti i campi obbligatori</h1>
            </div>
        );
    };

    return (
        <>
        <Navbar/>
            <div className="container mt-3" data-bs-theme="dark">
                <div className="card border-dark" style={{ backgroundColor: "#000000ed" }}>
                    <div className="card-body text-center">
                        <div>
                            <h2>Registrazione</h2>
                        </div>

                        <div className="messages">
                            {errorMessage()}
                            {successMessage()}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">E-mail</span>
                                <input
                                    onChange={handleMail}
                                    className="form-control"
                                    value={mail}
                                    type="email"
                                />
                            </div>
                                <span style={{ color: '#ffc107' }}>{passwordError}</span>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                                <input
                                    onChange={handlePassword}
                                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                    value={password}
                                    type="password"
                                />
                                <div className="error-message">
                                </div>
                            </div>
                                <span style={{ color: '#ffc107' }}>{phoneError}</span>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Telefono</span>
                                <input
                                    onChange={handlePhone}
                                    className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                                    value={phone}
                                    type="text"
                                />
                                <div className="error-message">
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Posizione X</span>
                                <input
                                    onChange={handlePositionX}
                                    className="form-control"
                                    value={positionX}
                                    type="number"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Posizione Y</span>
                                <input
                                    onChange={handlePositionY}
                                    className="form-control"
                                    value={positionY}
                                    type="number"
                                />
                            </div>
                            <button className="btn btn-warning" type="submit">
                                Invia
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
