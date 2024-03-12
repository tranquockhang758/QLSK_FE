import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
// import { useState } from "react";
import "./TablePagination.scss";
const rowHeaderOrigin = [
  { id: 1, title: "#" },
  { id: 2, title: "Họ và tên", value: "name" },
  { id: 3, title: "Công ty", value: "company" },
  { id: 4, title: "Tổng công ty", value: "motherCompany" },
  { id: 5, title: "Vai trò", value: "role" },
  // { id: 6, title: "Quyền truy cập", value: "levelOfAdmin" },
  { id: 5, title: "Tác vụ" },
];
function TableHeader(props) {
  //Props từ cha truyền xuống
  const { orderDirection, valueToOrderBy, handelSortRequest } = props;
  const [prevWindowSize, setWindowSize] = React.useState(props.windowSize);
  const [rowHeader, setRowHeader] = React.useState([
    { id: 1, title: "#" },
    { id: 2, title: "Họ và tên", value: "name" },
    { id: 3, title: "Công ty", value: "company" },
    { id: 4, title: "Tổng công ty", value: "motherCompany" },
    { id: 5, title: "Vai trò", value: "role" },
    // { id: 6, title: "Quyền truy cập", value: "levelOfAdmin" },
    { id: 5, title: "Tác vụ" },
  ]);
  //Props bên trong
  // const [orderByName, setOrderByName] = React.useState("name");
  // const [orderDirectionName, setOrderDirectionName] = React.useState("asc");

  // const [orderByAge, setOrderByAge] = React.useState("age");
  // const [orderDirectionAge, setOrderDirectionAge] = React.useState("asc");

  //Thay đổi mũi tên sort từ con
  const SortHandler = (property) => (event) => {
    handelSortRequest(event, property);
  };

  React.useEffect(() => {
    if (window.innerWidth > 700) {
      setRowHeader(rowHeaderOrigin);
    } else if (window.innerWidth < 700) {
      let newHeader = rowHeaderOrigin.filter(
        (item) => item.value !== "motherCompany" && item.value !== "company"
      );
      setRowHeader(newHeader);
    }
  }, [window.innerWidth]);
  return (
    <TableHead>
      <TableRow>
        {rowHeader &&
          rowHeader.length > 0 &&
          rowHeader.map((item, index) => {
            return (
              <TableCell key={index}>
                <TableSortLabel
                  active={valueToOrderBy === item.value}
                  direction={
                    valueToOrderBy === item.value ? orderDirection : "asc"
                  }
                  onClick={SortHandler(item.value)}
                >
                  {item.title}
                </TableSortLabel>
              </TableCell>
            );
          })}
      </TableRow>

      {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
    </TableHead>
  );
}

export default TableHeader;
