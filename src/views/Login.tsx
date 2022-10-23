
import LoadingButton from '@mui/lab/LoadingButton';
import { FormHelperText, TextField } from '@mui/material';
import { Formik } from 'formik';
import { get, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import auth from '../actions/auth';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector(state => get(state, 'auth', ''));
  const [isLoading ,setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!!get(authState, 'creds.access_token', '')) {
      return navigate('/');
    }

    if (!isEmpty(authState.creds) || !!authState.error) {
      return setIsLoading(false);
    }
  }, [authState]);

  return (
    <Formik
      enableReinitialize
      initialValues={{ username: '', password: '' }}
      validate={values => {
        const errors: any = {};
        /*
        -- got a little bit confused here so I added this just in case this is needed --
        -- Inquiry: Scenario is (the email must be valid) but the username value should be (USERNAME: exercisetestuser)? --

        -- in case we need to validate a real email address format
          if (!values.username) {
            errors['username'] = 'Required';
            return errors;
          }
          if (values.username.length < 1) {
            errors['passusernameword']= 'Minimum of 6 characters';
            return errors;
          }
        */

        if (!values.password) {
          errors['password'] = 'Required';
          return errors;
        }

        if (values.password.length < 1) {
          errors['password']= 'Minimum of 6 characters';
          return errors;
        }
        
        return errors;
      }}
      onSubmit={(values) => {
        setIsLoading(true);
        dispatch(
          auth({ username: values.username, password: values.password })
        );
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        values,
      }) => (
        <div>
          <div className="flex justify-center mt-10">
            <div className="flex flex-col border border-[#34558B] rounded-md">
              <div className="bg-white mb-4 mt-10 mx-10 rounded-lg text-blacklight">
                <TextField
                  error={!!errors.username}
                  fullWidth
                  label="Username"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Username"
                  value={values.username}
                />
                <FormHelperText error style={{ textAlign: 'center'}}>{errors.username}</FormHelperText>
              </div>
              <div className="bg-white mx-10 my-4 rounded-lg text-blacklight">
                <TextField
                  error={!!errors.password}
                  fullWidth
                  label="Password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                  value={values.password}
                />
                <FormHelperText error style={{ textAlign: 'center'}}>{errors.password}</FormHelperText>
              </div>
              <div className="bg-white mb-10 mt-4 mx-10 rounded-lg">
                <LoadingButton
                  color="primary"
                  disabled={!isEmpty(errors) || isLoading}
                  fullWidth
                  loading={isLoading}
                  onClick={() => handleSubmit()}
                  variant="outlined"
                >
                  SUBMIT
                </LoadingButton>
                <FormHelperText error style={{ textAlign: 'center'}}>{authState.error}</FormHelperText>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}


export default Login;