import React from 'react';
import "./RefisterForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import { REGISTERS } from "../../../gql/user"
export default function RegisterForm(props) {

    const { setShowLogin } = props;

    const [register] = useMutation(REGISTERS);

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object({
            name: Yup.string().required("Tu nombre es obligatorio"),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "El nombre de usuario no puede tener espacios").required("Tu nombre de usuario es obligatorio"),
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("repeatpassword")], "Las contraseñas no son iguales"),
            repeatpassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),

        }),
        onSubmit: async (formValue) => {

            try {
                const newUsers = formValue;

                delete newUsers.repeatpassword;

                const result = await register({
                    variables: {

                        input: { newUsers },

                    },

                });

                console.log(result);
            } catch (error) {

                console.log(error.message);
            }
        }
    });


    return (
        <>
            <h2 className="register-form-title">Regístrate para ver fotos y videos de tus amigo</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>

                <Form.Input type="text" onChange={formik.handleChange} placeholder="Nombre y Apellidos" name="name" value={formik.values.name} error={formik.errors.name && true} />
                <Form.Input type="text" onChange={formik.handleChange} placeholder="Nombre de Usuario" name="username" value={formik.values.username} error={formik.errors.username && true} />
                <Form.Input type="text" onChange={formik.handleChange} placeholder="Correo Electronico" name="email" value={formik.values.email} error={formik.errors.email && true} />
                <Form.Input type="password" onChange={formik.handleChange} placeholder="Contraseña" name="password" value={formik.values.password} error={formik.errors.password && true} />
                <Form.Input type="password" onChange={formik.handleChange} placeholder="Repetir Contraseña" name="repeatpassword" value={formik.values.repeatpassword} error={formik.errors.repeatpassword && true} />

                <Button type="submit" className="btn-submit">Registrarse</Button>

            </Form>
        </>
    )
}
function initialValue() {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatpassword: ""
    }
};
