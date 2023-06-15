import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import moment from 'moment';



export default function DataTable({ log }) {
  const columns: GridColDef[] = [
    { field: 'memorial', headerName: 'Memorial', width: 250 },
    {
      field: 'plan',
      headerName: 'Plan',
      width: 130,
      renderCell: (params) => params.row?.plan?.name || ""
    },
    { field: 'amount', headerName: 'Amount', width: 130 },
    // { field: 'amount', headerName: 'Status', width: 130 },
    {
      field: 'payment_date',
      headerName: 'Payment Date',
      width: 130,
      renderCell: (params) => moment(params.row?.payment_date).format("DD/MM/YYYY")
    },
    {
      field: 'expiration_date',
      headerName: 'Expiration Date',
      width: 130,
      renderCell: (params) => moment(params.row?.expiration_date).format("DD/MM/YYYY")

    },

  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={log?.data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

    </div>
  );
}