import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = props => {
    const [user, setUser] = useState([]);

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
                        // checked={props.values.terms}
                        />
                        Terms of Service
                        <span className="checkmark" />
                </label>
                <button type="submit">Submit!</button>
            </Form>
        </div>
    )
}

export default UserForm;