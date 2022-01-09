import React from "react";
import { StatusColumn } from '../StatusColumn'
import { DataContext } from '../Table'
import { FormAction } from '../Action'
import ImageWithStatus from "../../../../img";
import { ADMIN } from '../../../api/APIEndPoint'
import { ColumnFilter } from '../ColumnFilter'



export const COLUMNS = [
    {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
        Filter: ColumnFilter,
    },{
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
        Filter: ColumnFilter,
    },
    {
        Header: "Email",
        Footer: "Email",
        accessor: "email",
        disableFilters: true,
    },
    {
        Header: "Phone No.",
        Footer: "Phone No.",
        accessor: "contact_number",
        disableFilters: true,
    },{
        Header: "Address",
        Footer: "Address",
        accessor: "address",
        disableFilters: true,
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: 'id',
        disableFilters: true,
        Cell: (row) => <FormAction page={'admin'} data={row} statusList={ {In_active:0, Active:1} } flag = {false} DataContext={DataContext} endpoint="http://localhost:3003/admin/delete" />
    }
];
