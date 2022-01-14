import React from "react";
import { StatusColumn } from '../StatusColumn'
import { DataContext } from '../Table'
import { FormAction } from '../Action'
import ImageWithStatus from "../../../../img";
import { ADMIN } from '../../../api/APIEndPoint'
import { ColumnFilter } from '../ColumnFilter'



export const COLUMNS = [
    {
        Header: "Name",
        Footer: "Name",
        accessor: "name",
        disableFilters: true,
    },
    {
        Header: "Price",
        Footer: "Price",
        accessor: "price",
        disableFilters: true,
    },
    {
        Header: "Image",
        Footer: "Image",
        accessor: "img",
        Cell: ({ cell: { value } }) => {
            console.log("vvvv",value)
            return (
                <img src={value} width={50} height={50} />
            )
        },
        disableFilters: true,
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: 'id',
        disableFilters: true,
        Cell: (row) => <FormAction page={'item'} data={row} statusList={ {In_active:0, Active:1} } flag = {false} DataContext={DataContext} endpoint="http://localhost:3003/items/delete" />
    }
];

