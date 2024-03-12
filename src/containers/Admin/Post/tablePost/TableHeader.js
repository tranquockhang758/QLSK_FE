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
  { id: 8, title: "Tác giả", value: "author" },
  { id: 2, title: "Tiêu đề", value: "title" },
  { id: 3, title: "Mô tả ngắn", value: "subscription" },
  // { id: 4, title: "Loại nhà máy", value: "typeOfField" },
  { id: 5, title: "Loại sáng kiến", value: "category" },
  { id: 6, title: "Lượt xem", value: "view" },
  { id: 7, title: "Tác vụ" },
];
function TableHeader(props) {
  //Props từ cha truyền xuống
  const { orderDirection, valueToOrderBy, handelSortRequest } = props;
  const [windowSize, setWindowSize] = React.useState(props.windowSize);
  const [rowHeader, setRowHeader] = React.useState(rowHeaderOrigin);
  //Thay đổi mũi tên sort từ con
  const SortHandler = (property) => (event) => {
    handelSortRequest(event, property);
  };

  React.useEffect(() => {
    if (window.innerWidth > 700) {
      setRowHeader(rowHeaderOrigin);
    } else if (window.innerWidth < 700) {
      let newHeader = rowHeaderOrigin.filter(
        (item) => item.value !== "subscription" && item.value !== "category"
      );
      setRowHeader(newHeader);
    }
  }, [window.innerWidth]);
  // if (prevWindowSize !== props.windowSize) {
  //   console.log(prevWindowSize);
  //   // Prop A changed, notify parent
  //   props.onChangeWindowSize(props.windowSize);
  //   setWindowSize(props.windowSize);
  //   if (prevWindowSize < 700) {
  //     //remove company và motherCompany
  //     let newRowHeader = rowHeader.filter(
  //       (item) => item.value !== "subscription" && item.value !== "category"
  //     );
  //     setRowHeader(newRowHeader);
  //   } else {
  //     setRowHeader(rowHeaderOrigin);
  //   }
  // }
  // console.log("Chheck user", window.innerWidth);
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
    </TableHead>
  );
}

export default TableHeader;
