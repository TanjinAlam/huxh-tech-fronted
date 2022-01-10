import React from "react";
import { StatusColumn } from '../StatusColumn'
import { DataContext } from '../Table'
import { FormAction } from '../OrderTableAction'
import ImageWithStatus from "../../../../img";
import { ADMIN } from '../../../api/APIEndPoint'
import { ColumnFilter } from '../ColumnFilter'



export const COLUMNS = [
    {
        Header: "Label",
        Footer: "Label",
        accessor: "name",
        Filter: ColumnFilter,
    },
    {
        Header: "Price",
        Footer: "Price",
        accessor: "price",
        disableFilters: true,
    },
    {
        Header: "address",
        Footer: "address",
        accessor: "walletAddress",
        disableFilters: true,
    },
    {
        Header: "address",
        Footer: "address",
        accessor: "contractAddress",
        disableFilters: true,
    },
    {
        Header: "productId",
        Footer: "productId",
        accessor: "productId",
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

