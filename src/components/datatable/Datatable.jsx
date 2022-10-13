import React, { useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, bookingColumns } from "../../dataTableSource";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, removeUser } from "../../redux/features/user/userActions";
import { fetchBookings, removeBooking } from "../../redux/features/booking/bookingActions";

const Datatable = () => {
  const users = useSelector((state) => state.user.items);
  const bookings = useSelector((state) => state.booking.items)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/users") {
      dispatch(fetchUsers());
    } else if (location.pathname === "/bookings") {
      dispatch(fetchBookings());
    } else if (location.pathname === "/venues") {
      dispatch(fetchUsers());
    } else {
      console.log(location.pathname);
    }
  }, [dispatch, location.pathname]);

  const handleDelete = (id) => {
    if (location.pathname === "/users") {
      dispatch(removeUser(id));
    } else if (location.pathname === "/bookings") {
      dispatch(removeBooking(id));
    } else if (location.pathname === "/venues") {
      dispatch(removeUser(id));
    } else {
      console.log(location.pathname);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="cellAction__icon">
                <VisibilityIcon className="icon" />
              </div>
            </Link>
            <Link
              to={`${location.pathname}/update/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="cellAction__icon">
                <EditIcon className="icon" />
              </div>
            </Link>
            <div
              className="cellAction__icon"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon className="icon" />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      {location.pathname === "/users" && (
        <DataGrid
          autoHeight
          rows={users}
          columns={userColumns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          className="datatable__grid"
        />
      )}
      {location.pathname === "/bookings" && (
        <DataGrid
          autoHeight
          rows={bookings}
          columns={bookingColumns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          className="datatable__grid"
        />
      )}
      {location.pathname === "/venues" && (
        <DataGrid
          autoHeight
          rows={bookings}
          columns={bookingColumns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          className="datatable__grid"
        />
      )}
    </div>
  );
};

export default Datatable;