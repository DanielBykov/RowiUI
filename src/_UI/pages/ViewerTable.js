import {filter} from 'lodash';
import {useEffect, useState} from 'react';
// material
import {
  Alert,
  Box,
  Button,
  Card,
  Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
// components
import Page from '../cmp/Page';
import Scrollbar from '../cmp/Scrollbar';
import Iconify from '../cmp/Iconify';
// mock
import {API} from "aws-amplify";
import {
  createRowiUIDashViewer,
  createRowiUIUser,
  deleteRowiUIDashViewer,
  deleteRowiUIDevice, updateRowiUIDashViewer,
  updateRowiUIDevice
} from "../../graphql/mutations";
import {DeviceMoreMenu_v2} from "./@deviceTable/DeviceMoreMenu";
import {useContextDataUi} from "../../_DATA/context";
import {LoadingButton} from "@mui/lab";
import {apiGraphQlQuery, apiGraphQlQuery_WithErrorReturn} from "../../_DATA/hooks/useGraphQL";
import Label from "../cmp/Label";
import DeviceListHead from "./@deviceTable/DeviceListHead";

// TODO Formik
const AddUserForm = ({open, setOpen}) => {
  const [email, setEmail]           = useState("")
  const [isSetting, setIsSetting]   = useState(false)
  const [successMgs, setSuccessMgs] = useState("")
  const [errorMgs, setErrorMgs]     = useState("")
  const {dashID, updateUserUI}      = useContextDataUi()

  // Close
  const handleClose = () => {
    setOpen(false)
    setEmail("")
    setSuccessMgs("")
    setErrorMgs("")
    setIsSetting(false)
  }

  // Add
  const handleAdd = async () => {
    setIsSetting(true)
    const [,errors] = await apiGraphQlQuery_WithErrorReturn(
      {createRowiUIDashViewer},
      { input: { email, rowiuidashID:dashID, status: true }}
    )
    if(errors) {
      setErrorMgs("Something went wrong. API error.")
    } else {
      // setSuccessMgs("Done! A new user is successfully added to your dashboard.")
      updateUserUI()
      handleClose()
    }
    setIsSetting(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new dashboard user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new user to the dashboard (read-only permissions) input an email address to the form below.
          </DialogContentText>

          {errorMgs &&
            <Box component="span" sx={{ p: 2 }}>
              <Alert severity="error" onClose={() => {setErrorMgs("")}}>
                {errorMgs}
              </Alert>
            </Box>}
          {successMgs &&
            <Box component="span" sx={{ p: 2 }}>
              <Alert severity="success" onClose={() => {setSuccessMgs("")}}>
                {successMgs}
              </Alert>
            </Box>}

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            disabled={isSetting}
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <LoadingButton
            loading={isSetting}
            onClick={handleAdd}
          >Add User</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'id', hidden: true },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'updatedAt', label: 'Updated At', alignRight: false },
  // { id: 'rowiuidashID', label: 'rowiuidashID', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: ''}, // Action menu
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserTable() {
  const [page, setPage]                = useState(0);
  const [order, setOrder]              = useState('asc');
  const [orderBy, setOrderBy]          = useState('name');
  const [filterName, setFilterName]    = useState('');
  const [changeName, setChangeName]    = useState('');
  const [itemList, setItemList ]       = useState([])
  const [addUserForm, setAddUserForm ] = useState(false)
  const [editRow, setEditRow ]         = useState(null)
  const { viewerItems, updateUserUI }  = useContextDataUi()

  // Get DashViewers list from Amplify DB
  useEffect(() => {
    if(viewerItems){
      setItemList(viewerItems)
    }
  },[viewerItems])

  // Sorting todo
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // useEffect(() => {
  //   setDeviceList(
  //     applySortFilter( deviceList, getComparator(order, orderBy) )
  //   )
  // }, [order, orderBy])

  // Save
  const saveItem = (id) => async () => {
    await API.graphql({
      query: updateRowiUIDashViewer,
      variables: { input: { id, email: changeName } }
    })
    updateUserUI()
    setEditRow(null)
  }

  // Edit
  const editName = (id, status) => async () => {
    await apiGraphQlQuery({updateRowiUIDashViewer},{
      input: { id, name: !status }
    })
    updateUserUI()
  }
  // Status
  const switchStatus = (id, status) => async () => {
    await apiGraphQlQuery({updateRowiUIDashViewer},{
      input: { id, status: !status }
    })
    updateUserUI()
  }

  // Delete
  const deleteItem = (id) => async () => {
    await API.graphql({
      query: deleteRowiUIDashViewer,
      variables: { input: { id } }
    })
    updateUserUI()
  }

  const noItems = itemList.length === 0;

  return (
    <>
      <AddUserForm open={addUserForm} setOpen={setAddUserForm} />
      <Page title="Dashboard users eeeeeeeeeeeee">
        <Container>

          {/*Header*/}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Rowi Devices
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill"/>}
              onClick={() => {setAddUserForm(true)}}
            >
              Add a new User
            </Button>
          </Stack>

          {/*Table*/}
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <DeviceListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {
                      itemList
                        .map((row) => {
                          const {
                            id,
                            email,
                            updatedAt,
                            status
                          } = row;
                          const isItemSelected = editRow === id;
                          // const statusColorMap = {'active': 'success', 'inactive': 'default'}
                          // const status = sample(['active', 'inactive'])

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap style={{paddingLeft: 15}}>
                                    { isItemSelected
                                      ? <TextField
                                          id="outlined-basic"
                                          label="Change name"
                                          variant="outlined"
                                          defaultValue={email}
                                          onChange={(e) => {setChangeName(e.target.value)}}
                                        />
                                      : email
                                    }
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">{updatedAt}</TableCell>

                              <TableCell align="left">
                                <Label variant="ghost" color={status ? 'success' : 'default'}>
                                  {status ? 'active' : 'inactive'}
                                </Label>
                              </TableCell>

                              <TableCell align="right">
                                { isItemSelected
                                  ? <>
                                    <Button variant="outlined" onClick={saveItem(id)} sx={{mr: 1}}>
                                      Ok
                                    </Button>
                                    <Button variant="outlined" onClick={()=>setEditRow(null)}>
                                      Cancel
                                    </Button>
                                  </>
                                  : <DeviceMoreMenu_v2 confMenuItems={[
                                      {label: 'Edit name', icon: 'eva:edit-fill', onClick: ()=>setEditRow(id)},
                                      {label: status ? 'Deactivate':'Activate', icon: 'eva:edit-fill', onClick: switchStatus(id, status)},
                                      {label: 'Delete', icon: 'eva:edit-fill', onClick: deleteItem(id)  }
                                  ]}/>
                                }
                              </TableCell>
                            </TableRow>
                          );
                        })
                    }
                  </TableBody>

                  {noItems && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper>
                            <Typography gutterBottom align="center" variant="subtitle1">
                              No Users. Add a new one.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>

        </Container>
      </Page>
    </>

  );
}
