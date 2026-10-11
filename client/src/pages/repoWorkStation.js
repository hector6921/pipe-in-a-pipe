import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, Fab, Stack, Chip, Stepper, Step, StepLabel } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

function createData(name, path, deploy) {
  return {
    name,
    path,
    deploy,
    history: [
      { date: '2020-01-05 12:24', result: 'Success' },
      { date: '2020-01-02 20:15', result: 'Failed' },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [choice, setChoice] = React.useState('progress');
  const steps = ['Provisioning Resources', 'Back-End', 'Front-End', 'Finish'];

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.path}</TableCell>
        <TableCell>
          <IconButton aria-label="play row"><PlayCircleFilledWhiteIcon fontSize="large" color="primary" /></IconButton>
          <IconButton aria-label="pause row"><PauseCircleIcon fontSize="large" color="primary" /></IconButton>
          <IconButton aria-label="stop row"><StopCircleIcon fontSize="large" color="primary" /></IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Stack direction="row" spacing={1}>
                <Chip label="Progress" color="primary" variant="outlined" />
                <Chip label="History" color="primary" variant="outlined" />
              </Stack>

              {choice === 'progress' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Stepper activeStep={1} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <Box
                    sx={{
                      borderRadius: '1em',
                      margin: '2em',
                      width: 600,
                      height: 300,
                      backgroundColor: '#111111',
                      padding: '3%',
                    }}
                  >
                    <Typography sx={{ color: '#fff', width: '50%' }}>
                      Deployment in progress...
                    </Typography>
                  </Box>
                </div>
              ) : (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Result</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.result}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        result: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('pipe-in-a-pipe', 'https://github.com/example/pipe-in-a-pipe', true),
  createData('pipe-in-a-pipe-v2', 'https://github.com/example/pipe-in-a-pipe-v2', true),
  createData('pipe-in-a-pipe-v3', 'https://github.com/example/pipe-in-a-pipe-v3', true),
];

export default function CollapsibleTable() {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Repo</TableCell>
              <TableCell>Path</TableCell>
              <TableCell align="right">Deploy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
