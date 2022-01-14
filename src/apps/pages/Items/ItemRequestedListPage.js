
import { DataTable } from "../../components/tables/Table"
import { COLUMNS } from "../../components/tables/column/ItemOrderedListColumn";

function AdminListPage() {
    return (
        <>
            <div className="content">
                <div className="row">
                    <div className="col-sm-4 col-3">
                        <h4 className="page-title">Item requested list</h4>
                    </div>
                </div>

                <div className="row table_section">
                    <div className="col-md-12">
                        <DataTable COLUMNS={COLUMNS} endpoint={"https://backend.huxhtech.com/api/v1/huxh-deal/requestedOrder"} />
                    </div>
                </div>
            </div>
            <div id="delete_employee" className="modal fade delete-modal" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <img src="assets/img/sent.png" alt="" width="50" height="46" />
                            <h3>Are you sure want to delete this User?</h3>
                            <div className="m-t-20"> <a href="#" className="btn btn-white" data-dismiss="modal">Close</a>
                                <button type="submit" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminListPage

