import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result); 
                navigate('/login'); 
            })
            .catch(err => {
                console.log(err); 
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('Алдаа гарлаа дахин оролдоно уу');
                }
            });
    };
    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div style={styles.signupContainer}>
            <h2 style={styles.heading}>Sign Up</h2>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Name</label>
                    <input
                        type="text"
                        placeholder="Хэрэглэгчийн нэрээ оруулна уу"
                        autoComplete='off'
                        name="name"
                        style={styles.input}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        placeholder="Мэйл хаягаа оруулна уу"
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
                        placeholder="Нууц үгээ оруулна уу"
                        autoComplete='off'
                        name="password"
                        style={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button type="submit" style={styles.submitButton}>Sign Up</button>
            </form>

            <button onClick={handleLoginRedirect} style={styles.loginButton}>Log In</button>
        </div>
    );
};

const styles = {
    signupContainer: {
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
    loginButton: {
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

export default SignUp;
