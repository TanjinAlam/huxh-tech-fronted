import React, { useContext, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination, useFilters } from "react-table";
import { LoadingContext } from "../../../App"
import axios from '../../../authAxios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const DataContext = React.createContext([])

export const DataTable = ({ COLUMNS, endpoint, query, status }) => {
    const get_cookies = cookies.get('data')
    
    // if(endpoint.pendingList){

    // }
    // console.log("ENDPOINT", endpoint.list)
    // init page loader context
    const pageLoader = useContext(LoadingContext)
    // use state for loading indicator
    const [loadingData, setLoadingData] = useState(true);
    // data fetch indicator
    const [data, setData] = useState([]);

    // load hospital data list
    useEffect(() => {
        console.log("endpoint",endpoint,get_cookies.id)
        // console.log('Date', new Date())
        async function getData() {
            await axios.post(endpoint,{userId:get_cookies.id})
                .then((res) => {
                    console.log("reee",res)

                    // set data
                    setData(res.data.data);
                    // loader indicator close
                    pageLoader.loadingState(false)
                    // you tell it that you had the result
                    setLoadingData(false);
                }).catch((err) => {
                    console.error(`In Component DoctorBannerListTable :: ${err}`)
                    return false
                })
        }
        if (loadingData) {
            // loader indicator start
            pageLoader.loadingState(true)
            // if the result is not ready so you make the axios call
            getData().then(res => { console.log(res) }).catch((err) => { console.log(err) });
        }
    }, []);


    function resetData(id) {
        let newData = data.filter(item => {
            return id != item.id
        })
        setData(newData)
    }

    function changeStatus(value) {
        const newData = [...data];
        let index = newData.findIndex((item) => value.id == item.id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...value });
        setData(newData)
    }



    // set doctor banner list for generate table
    const tableInstance = useTable(
        {
            columns: COLUMNS,
            data: data,
            initialState: {
                hiddenColumns: [
                    "specialistId",
                    "specialitiesGroupId",
                    "healthIssueGroupId",
                    "labtest.id",
                    "healthIssueId",
                    "online",
                    "user.id",
                    "designation",
                    "practicingSince",
                    "department",
                    "questionId",
                    "updatedAt",
                    "userId",
                    "doctor.id",
                    "education",
                    "questionGroupId",
                    "question_group.id",
                    "health_issue.id",
                    "health_issue.order",
                    "doctorId",
                    "specialist.name",
                    "hospital.id",
                    "hospitals.id",
                    "blogCategoryId",
                    "admin_dashbaord_permission",
                    // "id",
                    "coupon_to_users",
                    "nIdPassport",
                    "language",
                    "dateOfBirth",
                    "degree",
                    "lat",
                    "long",
                    "followUpDiscount",
                    "followUpDuration",
                    "doctor.id",
                    "contractAddress",
                    "walletAddress",
                ]
            }
        },
        useFilters,
        //useGlobalFilter,
        useSortBy,
        usePagination,


    );

    const {
        getTableProps, // table props from react-table
        headerGroups, // headerGroups, if your table has groupings
        getTableBodyProps, // table body props from react-table
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        footerGroups,
        state,
        setGlobalFilter,
        page, // use, page or rows
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <div className="row">
                {/* <div className="col-lg-6">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div> */}
                {/* {endpoint == 'QUESTION' ? (
                    <div className="col-lg-6">
                        <FilterByQuestionGroup filter={filterByQuestionGroup} setFilter={SetFilterByQuestionGroup} />
                    </div>
                ) : null} */}

                <div className="col-lg-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <span className="mr-1">Show</span>
                        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}
                            className="custom-select custom-select-sm form-control form-control-sm">
                            {[10, 25, 50, 100].map((pageSize) => (
                                <option key={pageSize} value={pageSize}> {pageSize} </option>
                            ))}
                        </select>
                        <span className="ml-1">entries</span>
                    </div>
                </div>
            </div>


            <DataContext.Provider value={{ data, resetData, changeStatus }}>
                <table {...getTableProps()} className="table table-hover table-striped custom-table">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? " 🔽"
                                                    : " 🔼"
                                                : ""}
                                        </span>

                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        {footerGroups.map((footerGroup) => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {footerGroup.headers.map((column) => (
                                    <td {...column.getFooterGroupProps}>
                                        <strong>{column.render("Footer")}</strong>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
                <div>
                    <span>
                        Page{" "} <strong> {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </span>
                    <ul className="pagination">
                        <li className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
                            <a className="page-link" href="#" tabIndex="-1" onClick={() => gotoPage(0)}  >First</a>
                        </li>
                        <li className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
                            <a className="page-link" href="#" onClick={() => { previousPage() }} > {'<<'} </a>
                        </li>
                        <li className={`page-item ${canNextPage ? '' : 'disabled'}`}>
                            <a className="page-link" href="#" onClick={() => { nextPage(); }} > {'>>'} </a>
                        </li>
                        <li className={`page-item ${canNextPage ? '' : 'disabled'}`}>
                            <a className="page-link" href="#" onClick={() => gotoPage(pageCount - 1)} >Last</a>
                        </li>
                    </ul>
                </div>
            </DataContext.Provider>
        </>
    );
}
