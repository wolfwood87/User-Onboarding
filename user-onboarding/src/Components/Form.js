import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = props => {
    const [users, setUsers] = useState([]);

    return (
        <div className="user-form">
            <Form>
                <Field type='text' name="name" placeholder="name" />
                <Field type='text' name="email" placeholder="email" />
                <Field type='text' name="password" placeholder="password" />
                <label className="terms-container">
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={props.values.terms}
                        />
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

const formikObj = {
    mapPropsToValues: myMapProps,
    handleSubmit: mySubmit,
    // validationSchema: yupSchema
};



const NewForm = withFormik(formikObj);

const NewUserForm = NewForm(UserForm);

export default NewUserForm;