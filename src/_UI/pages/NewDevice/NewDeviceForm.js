import * as Yup from 'yup';
import {useState} from 'react';
import {Form, FormikProvider, useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
// material
import {Alert, Box, IconButton, InputAdornment, Stack, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import Iconify from "../../cmp/Iconify";
import {deviceCreate} from "../../../_DATA/hooks/useGraphQL";
import axios from "axios";
import {useContextDataUi} from "../../../_DATA/context";
// component

// ----------------------------------------------------------------------

const deviceCheck = async (deviceId, s2, setError, formikSetErrors) => {
  /*
  * API responses:
  * 1 - data : {deviceCheck: 'ok'}
  * 2 - data : {error: 'secret not matched'}
  * 3 - data : {error: 'no params - deviceId or s2'}
  * 4 - data : {error: 'device not found'}
  * 5 - network error
  * */
  const checkDeviceURL = 'https://hsqurmxg9f.execute-api.us-east-1.amazonaws.com/checkDevice'
  let deviceCheckRes = false
  let info = {}

  try {

    const apiResp = await axios.get(checkDeviceURL, {
      params: {
        deviceId,
        s2
      }
    })

    const { data: {deviceCheck, error} } = apiResp

    // 1,2 - data : {deviceCheck: '...'}
    deviceCheckRes = deviceCheck === 'ok'

    // 3,4 - data : {error: '...'}
    if(error) {
      info.error = error

      // Set an error message above the form
      let m;
      switch (error){
        case "device not found"           : m = "API Error: Device ID not found"; setError(m); formikSetErrors({dId: m}); break
        case "secret not matched"         : m = "API Error: Wrong Device Secret"; setError(m); formikSetErrors({dSecret: m}); break
        case "no params - deviceId or s2" : m = "API Error: No params - deviceId or s2"; setError(m); formikSetErrors({dId: m, dSecret: m}); break
        default: setError(error)
      }
    }

  } catch (e) {
    const {message} = e
    info.error = message
    setError(message)
  }

  return {deviceCheckRes, info}

}

export default function NewDeviceForm() {
  const navigate = useNavigate();

  // const dataUI = useContext(ContextDataUI)
  const { dashID:rowiuidashID, updateUserUI } = useContextDataUi()

  const [showPassword, setShowPassword] = useState(false);
  const [errorMgs, setErrorMgs] = useState("");
  const [successMgs, setSuccessMgs] = useState("");

  const RegisterSchema = Yup.object().shape({
    dName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    dId: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Device ID required'),
    dSecret: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Device Secret is required'),
  });

  const formik = useFormik({

    initialValues: {
      dName: '',
      dId: '',
      dSecret: ''
    },

    validationSchema: RegisterSchema,

    onSubmit: async () => {
      setErrorMgs("");


      let { dName, dId, dSecret} = formik.values;
      dName = dName || dId; // Empty Device Name

      // Check Device ID and Device Secret on the remote DynamoDB table
      const {deviceCheckRes, info} = await deviceCheck(dId, dSecret, setErrorMgs, formik.setErrors);
      if(deviceCheckRes){

        // Create Device item in Dashboard
        await deviceCreate(dName, dId, rowiuidashID)
        updateUserUI()

        setSuccessMgs("Done! A new device is successfully added to your dashboard. Redirect to Rowi Devices in 5 secs...")
        setTimeout(() => {
          navigate('/dashboard/devices', { replace: true });
        }, 5000)
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setErrors } = formik;

  return (
    <FormikProvider value={formik}>

      {errorMgs &&
        <Box component="span" sx={{ p: 2 }}>
          <Alert severity="error">
            {errorMgs}
          </Alert>
        </Box>}
      {successMgs &&
        <Box component="span" sx={{ p: 2 }}>
          <Alert severity="success">
            {successMgs}
          </Alert>
        </Box>}

      <Form noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Device Name"
            {...getFieldProps('dName')}
            error={Boolean(touched.dName && errors.dName)}
            helperText={touched.dName && errors.dName}
          />

          <TextField
            fullWidth
            label="Device ID"
            autoComplete="current-password"
            {...getFieldProps('dId')}
            error={Boolean(touched.dId && errors.dId)}
            helperText={touched.dId && errors.dId}
          />

          <TextField
            fullWidth
            autoComplete="off"
            type={showPassword ? 'text' : 'password'}
            label="Device Secret (secret2)"
            {...getFieldProps('dSecret')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.dSecret && errors.dSecret)}
            helperText={touched.dSecret && errors.dSecret}
          />

          <LoadingButton
            fullWidth size="large" type="submit" variant="contained"
            loading={isSubmitting}
            >
            Add
          </LoadingButton>
        </Stack>
      </Form>

    </FormikProvider>
  );
}
