import {useRef, useState} from 'react';
// material
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from '@mui/material';
// component
import Iconify from '../../cmp/Iconify';

// ----------------------------------------------------------------------

export function DeviceMoreMenu({item, deleteDeviceCallBack, editDeviceCallBack}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const editDeviceCallBackWrap = (id) => () => {
    setIsOpen(false)
    editDeviceCallBack(id)
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* Edit name */}
        <MenuItem sx={{ color: 'text.secondary' }} onClick={editDeviceCallBackWrap(item.id)}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {/* Delete */}
        <MenuItem sx={{ color: 'text.secondary' }} onClick={deleteDeviceCallBack(item.id)}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}


export function DeviceMoreMenu_v2({confMenuItems}) {

  const onClickWrap = (fn) => () => {
    fn()
    setIsOpen(false)
  }

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {confMenuItems.map(({
                              label='-',
                              icon='eva:edit-fill',
                              onClick=() => {console.log('d256 menuClick')}}
        ) =>
          <MenuItem key={label} sx={{ color: 'text.secondary' }} onClick={onClickWrap(onClick)}>
            <ListItemIcon>
              <Iconify icon={icon} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary={label} primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
