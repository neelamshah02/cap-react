import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

 const App = () => {
    const MyTextInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);

        return (
            <React.Fragment>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input {...field} {...props} />
                {meta.touched && meta.error && (<p>{meta.error}</p>)}
            </React.Fragment>
        );
    }

    const MySelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <React.Fragment>
                <label htmlFor={props.id || props.name}>{label}</label>
                <select name={props.name} {...field} {...props}>
                    {props.children}
                </select>
                {meta.touched && meta.error && (<p>{meta.error}</p>)}
            </React.Fragment>
        );
    }

    return (
        <Formik
            initialValues={{
                email: '',
                username: '',
                password: '',
                gender: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .required('This field is required')
                    .email('Invalid email address')
                    .max(15, "email lenhth error"),
                username: Yup.string()
                    .required('This field is required')
                    .max(20, 'This field must be 20 characters or less'),
                password: Yup.string()
                    .required('This field is required')
                    .min(6, 'This field must be atleast 6 characters'),
                gender: Yup.string()
                    .required('This field is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 1));
                    console.log(JSON.stringify(values, null, 1));
                    setSubmitting(false);
                }, 1000);
            }}
            validateOnChange={true}
            validateOnBlur={true}
        >
            {formik => {
              
             console.log(formik)
                return <Form>
                <MyTextInput
                    label="Email"
                    name="email"
                    type="email"
                />
                <MyTextInput
                    label="Username"
                    name="username"
                    type="text"
                />
                <MyTextInput
                    label="Password"
                    name="password"
                    type="password"
                />
                <MySelect name="gender" label="Gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </MySelect>
                <button disabled={formik.isSubmitting || Object.keys(formik.errors).length} type="submit">Submit</button>
                <button type="reset">Reset</button>
            </Form>

            }
                
            }
        </Formik>
    );
}


export default App;
