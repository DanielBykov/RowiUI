import {Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import React from "react";

export const DeviceCard = ({deviceID, name, setActiveDevice, isActiveCard}) => {
  const activeCardSx = isActiveCard ? {border: 2, opacity: 1} : {}
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        onClick={() => {setActiveDevice(deviceID)}}
        sx={{
          opacity: 0.7,
          // py: 5,
          boxShadow: 3,
          textAlign: 'center',
          bgcolor: (theme) => theme.palette.primary.lighter,
          color: (theme) => theme.palette.primary.main,
          ...activeCardSx,
        }}
      >
        <CardActionArea disabled={isActiveCard}>
          <CardContent sx={{py:1}}>
            {/*<Typography variant="subtitle1">Rowi Device</Typography>*/}
            <Typography variant="h5">{name}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              {deviceID}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
