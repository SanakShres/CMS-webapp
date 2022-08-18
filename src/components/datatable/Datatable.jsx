import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, bookingColumns } from "../../dataTableSource";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Datatable = () => {
  const [tableData, setTableData] = useState([]);
  const location = useLocation();

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, location.pathname, id));
      setTableData(tableData.filter((data) => data.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let tableList = [];
      try {
        const querySnapshot = await getDocs(collection(db, location.pathname));
        querySnapshot.forEach((doc) => {
          tableList.push({
            id: doc.id,
            ...doc.data(),
            eventDate:
              doc.data().eventDate &&
              new Date(doc.data().eventDate.seconds * 1000),
          });
        });
        setTableData(tableList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [location.pathname]);
  console.log(tableData);

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
          rows={tableData}
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
          rows={tableData}
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
          rows={tableData}
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
