import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Preview } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
  {
    field: 'jobType',
    headerName: 'Job Type',
    width: 180,
  },
  {
    field: 'jobLocation',
    headerName: 'Location',
    width: 150,
  },
  {
    field: 'startDate',
    headerName: 'Start date',
    width: 170,
  },
  {
    field: 'endDate',
    headerName: 'End date',
    width: 170,
  },
  {
    field: 'requestingUserName',
    headerName: 'Requesting user',
    width: 140,
  },
  {
    field: 'requestingUserType',
    headerName: 'User type',
    width: 90,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 70,
    renderCell: (params) => <TableActions parameters= {params} />
  },
]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export const TableStyles = {
  padding: '0px',
  width: '100%',
  height: '300px',
  background: 'white',
  marginTop: '20px' 
}

var rows = [];

export default function BookingsTable({data}) {
  rows = data;

  return (
    <Box sx={TableStyles}>
      <DataGrid
        rowHeight={38}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{newEditingApi: true}}
        components={{Toolbar: CustomToolbar}}
      />
    </Box>
  );
};

// Table actions
const TableActions = ({parameters}) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton onClick={() => {  
          navigate(`/dash/bookings/${parameters.row.id}`);
          }}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
};
