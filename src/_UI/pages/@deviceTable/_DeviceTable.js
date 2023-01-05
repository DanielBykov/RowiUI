import {filter, sample} from 'lodash';
import {useContext, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
// material
import {
  Button,
  Card,
  Container,
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
import Page from '../../cmp/Page';
import Scrollbar from '../../cmp/Scrollbar';
import Iconify from '../../cmp/Iconify';
// import {DeviceListHead} from '../../../sections/@dashboard/device';
// mock
import {API} from "aws-amplify";
import {deleteRowiUIDevice, updateRowiUIDevice} from "../../../graphql/mutations";
import {DeviceMoreMenu} from "./DeviceMoreMenu";
import {useContextDataUi} from "../../../_DATA/context";
import {LoadingButton} from "@mui/lab";
import DeviceListHead from "./DeviceListHead";
import { format } from 'date-fns'
import {DATE_FORMAT_TABLE} from "../../../_DATA/const";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'deviceId', label: 'Device ID', alignRight: false },
  { id: 'updatedAt', label: 'Added At', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: ''},
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

export default function DeviceTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [changeName, setChangeName] = useState('');

  const { deviceItems, updateUserUI } = useContextDataUi()

  // Get Device list from Amplify DB
  const [deviceList, setDeviceList ] = useState([])
  useEffect(() => {
    if(deviceItems){
      setDeviceList(deviceItems)
    }
  },[deviceItems])

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

  // Edit device handlers
  const deleteDevice = (id) => async () => {
    await API.graphql({
      query: deleteRowiUIDevice,
      variables: { input: { id } }
    })
    updateUserUI()
  }
  const [editRow, setEditRow ] = useState(null)
  const editDevice = (id) => {
    setEditRow(id)
  }
  const saveDevice = async (id) => {
    await API.graphql({
      query: updateRowiUIDevice,
      variables: { input: { id, name: changeName } }
    })
    updateUserUI()
    setEditRow(null)
  }

  const noDevices = deviceList.length === 0;

  return (
    <Page title="Rowi Devices">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rowi Devices
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/add-device" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add a new Rowi Device
          </Button>
        </Stack>

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
                    deviceList
                      .map((row) => {
                    const {
                      id,
                      name,
                      // status,
                      deviceID,
                      createdAt,
                    } = row;
                    const isItemSelected = editRow === id;
                    const statusColorMap = {
                      'not connected': 'default',
                      'active': 'success',
                      'error': 'error'
                    }
                    const createdAtFormat = format(new Date(createdAt), DATE_FORMAT_TABLE)
                    const status = sample(['not connected', 'active', 'error'])

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
                            {/*<Avatar alt={name} src={avatarUrl} />*/}
                            <Typography variant="subtitle2" noWrap style={{paddingLeft: 15}}>
                              { isItemSelected
                                ? <TextField
                                    id="outlined-basic"
                                    label="Change name"
                                    variant="outlined"
                                    defaultValue={name}
                                    onChange={(e) => {setChangeName(e.target.value)}}
                                  />
                                : name
                              }
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{deviceID}</TableCell>
                        <TableCell align="left">{createdAtFormat}</TableCell>

                        {/*<TableCell align="left">*/}
                        {/*  <Label variant="ghost"*/}
                        {/*         color={statusColorMap[status]}*/}
                        {/*  >*/}
                        {/*    {status}*/}
                        {/*  </Label>*/}
                        {/*</TableCell>*/}

                        <TableCell align="right">
                          { isItemSelected
                            ? <Buttons id={id} saveDevice={saveDevice} setEditRow={setEditRow}>
                              {/*<Button variant="outlined" onClick={saveDevice(id)} sx={{mr: 1}}>*/}
                              {/*  Ok*/}
                              {/*</Button>*/}
                              {/*<Button variant="outlined" onClick={()=>setEditRow(null)}>*/}
                              {/*  Cancel*/}
                              {/*</Button>*/}
                            </Buttons>
                            : <DeviceMoreMenu
                              item={row}
                              deleteDeviceCallBack={deleteDevice}
                              editDeviceCallBack={editDevice}
                            />
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })}

                </TableBody>

                {noDevices && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper>
                          <Typography gutterBottom align="center" variant="subtitle1">
                            No Rowi Devices. Please add a new one.
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
  );
}

const Buttons = ({id, saveDevice, setEditRow}) => {
  const [loading, setLoading ] = useState(false)
  const handleOnClick = () => {
    setLoading(true)
    saveDevice(id)
  }
  return (
    <>
      <LoadingButton variant="outlined" onClick={handleOnClick} sx={{mr: 1}} loading={loading}>
        Ok
      </LoadingButton>
      <Button variant="outlined" onClick={()=>setEditRow(null)}>
        Cancel
      </Button>
    </>
  )
}
