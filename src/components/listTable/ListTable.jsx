import React from "react";
import "./listTable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
  {
    id: 1143155,
    events: "Wedding",
    img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
    customer: "John Smith",
    date: "1 March",
    amount: 1800,
    method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 2235235,
    events: "Bratabandha",
    img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
    customer: "Michael Doe",
    date: "1 March",
    amount: 1200,
    method: "Online",
    status: "Pending",
  },
  {
    id: 2342353,
    events: "Engagement",
    img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
    customer: "John Smith",
    date: "1 March",
    amount: 1500,
    method: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: 2357741,
    events: "Wedding",
    img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
    customer: "Jane Smith",
    date: "1 March",
    amount: 1200,
    method: "Online",
    status: "Approved",
  },
  {
    id: 2342355,
    events: "Janku",
    img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
    customer: "Harold Carol",
    date: "1 March",
    amount: 2000,
    method: "Online",
    status: "Pending",
  },
];

const ListTable = () => {
  return (
    <TableContainer component={Paper} className="table__container">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="table__cell">Tracking ID</TableCell>
            <TableCell className="table__cell">Booked Event</TableCell>
            <TableCell className="table__cell">Customer</TableCell>
            <TableCell className="table__cell">Date</TableCell>
            <TableCell className="table__cell">Amount</TableCell>
            <TableCell className="table__cell">Payment Method</TableCell>
            <TableCell className="table__cell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="table__cell">{row.id}</TableCell>
              <TableCell className="table__cell">
                <div className="cell__wrapper">
                  <img src={row.img} alt="" />
                  {row.events}
                </div>
              </TableCell>
              <TableCell className="table__cell">{row.customer}</TableCell>
              <TableCell className="table__cell">{row.date}</TableCell>
              <TableCell className="table__cell">{row.amount}</TableCell>
              <TableCell className="table__cell">{row.method}</TableCell>
              <TableCell className="table__cell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
