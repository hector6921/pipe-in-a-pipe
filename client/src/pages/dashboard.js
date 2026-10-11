import * as React from 'react';
import Typography from '@mui/material/Typography';
import DenseTable from '../components/densetable';
import Link from '@mui/material/Link';
import { Container } from '@mui/material';
import BasicCard from '../components/profileCard';

function DashboardContent() {
  const [udata, setuData] = React.useState([]);
  const [isUdataReady, setUdataReady] = React.useState(false);

  async function getUserData() {
    await fetch('http://localhost:5000/dashboard')
      .then((res) => res.json())
      .then((data) => setuData(data))
      .then(() => setUdataReady(true));
  }

  React.useLayoutEffect(() => {
    getUserData();
  }, []);

  if (isUdataReady === true) {
    return (
      <Container style={{ display: 'flex', padding: '5%' }}>
        <BasicCard photo={udata.user_info[0]} name={udata.user_info[1]} userName={udata.user_info[2]} url={udata.user_info[3]} />
        <Container style={{ height: '500px', width: '600px', overflow: 'scroll' }}>
          <DenseTable data={udata.repos} />
        </Container>
      </Container>
    );
  }

  return (
    <Container>
      <Typography>Loading...</Typography>
    </Container>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
