import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Grid, Container, Typography, CircularProgress } from '@mui/material';
import { API } from "../../Utils/axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegisterUser = () => {

    const params = useParams();
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        firstname: '',
        secondname: '',
        lastname: '',
        lastname2: '',
        nationality: '',
        dniType: '',
        cedula: '',
        sexo: '',
        birthDate: '',
        email: '',
        cellphone1: '',
        cellphone2: '',
        country: '',
        address: '',
        state: '',
        parish: '',
        municipality: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await API.get(`/user/${params.id}`);
                console.log(userResponse.data)
                setUser(userResponse.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/user', user);
            toast.success("Usuario registrado con éxito");
            
        } catch (error) {
            toast.error("Error registrando el usuario");
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Registrar Usuario
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Primer Nombre"
                            name="firstname"
                            value={user.firstname}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Segundo Nombre"
                            name="secondname"
                            value={user.secondname}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Apellido Paterno"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Apellido Materno"
                            name="lastname2"
                            value={user.lastname2}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nacionalidad"
                            name="nationality"
                            value={user.nationality}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Tipo de DNI"
                            name="dniType"
                            value={user.dniType}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Cédula"
                            name="cedula"
                            value={user.cedula}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Sexo"
                            name="sexo"
                            value={user.sexo}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de Nacimiento"
                            name="birthDate"
                            type="date"
                            value={user.birthDate}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <input type="hidden" name="userId" value={params.id} />
                        <TextField
                            label="Teléfono 1"
                            name="cellphone1"
                            value={user.cellphone1}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Teléfono 2"
                            name="cellphone2"
                            value={user.cellphone2}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Dirección"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="País"
                            name="country"
                            value={user.country}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Estado"
                            name="state"
                            value={user.state}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Municipio"
                            name="municipality"
                            value={user.municipality}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Parroquia"
                            name="parish"
                            value={user.parish}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Registrar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default RegisterUser;
