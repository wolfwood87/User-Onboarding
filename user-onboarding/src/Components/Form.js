import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = props => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (props.status) {
            setUsers([...users, props.status])
        }
    }, [props.status])

    return (
        <div className="user-form">
            <Form>
                <Field type='text' name="name" placeholder="name" />
                {props.touched.name && props.errors.name && (
                    <p className='error'>{props.errors.name}</p>
                )}
                <Field type='text' name="email" placeholder="email" />
                {props.touched.email && props.errors.email && (
                    <p className='error'>{props.errors.email}</p>
                )}
                <Field type='text' name="password" placeholder="password" />
                {props.touched.password && props.errors.password && (
                    <p className='error'>{props.errors.password}</p>
                )}
                <label className="terms-container">
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={props.values.terms}
                        />
                        {props.touched.terms && props.errors.terms && (
                            <p className='error'>Must check terms</p>
                        )}
                        Terms of Service
                        <span className="checkmark" />
                </label>
                <button type="submit">Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    )
}
const myMapProps = props => {
    console.log(props);
    const newObj = {
        name: props.name || '',
        email: props.email || '',
        password: props.password || '',
        terms: props.terms || true,
    }
    return newObj;
};

const mySubmit = (values, { setStatus }) => {
    axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log(res);
            setStatus(res.data);
        })
        .catch(err => console.log(err));
};

const yupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Please enter a valid email").required("Email is required"),
    password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required'),
    terms: Yup.boolean().isValid(true)
});

const formikObj = {
    mapPropsToValues: myMapProps,
    handleSubmit: mySubmit,
    validationSchema: yupSchema
};



const NewForm = withFormik(formikObj);

const NewUserForm = NewForm(UserForm);

export default NewUserForm;