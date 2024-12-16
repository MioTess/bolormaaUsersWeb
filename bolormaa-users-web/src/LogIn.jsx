import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.data.status === "Success") {
                    setUserName(result.data.name);
                    navigate('/home', { state: { name: result.data.name } });
                    console.log(result.data.name) 
                } else {
                    setErrorMessage(result.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                setErrorMessage('Нэр эсвэл нууц үг буруу байна');
            });
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    return (
        <div style={styles.loginContainer}>
            <h2 style={styles.heading}>Login</h2>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete='off'
                        name="email"
                        style={styles.input}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete='off'
                        name="password"
                        style={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button type="submit" style={styles.submitButton}>Login</button>
            </form>
            <button onClick={handleSignUp} style={styles.signUpButton}>Sign Up</button>
        </div>
    );
};

const styles = {
    loginContainer: {
        maxWidth: '400px',
        marginLeft: '550px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vh',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        borderRadius: '4px',
        width: '100%',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '15px',
    },
    signUpButton: {
        backgroundColor: '#008CBA',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        borderRadius: '4px',
        width: '100%',
        marginTop: '10px',
    },
};

export default LogIn;