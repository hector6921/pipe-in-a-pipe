import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import Link from '@mui/material/Link';

export default function BasicCard(props) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5%' }}>
      <Avatar alt="Profile Picture" src={props.photo} sx={{ width: 80, height: 80 }} />
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
          <Link href={props.url}>{props.name}</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.userName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
