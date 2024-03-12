import React, { Fragment } from "react";
import axios from "../../../../axios";
import Progress from "../../../inc/Progress";
import "./Datatable.scss";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Button from "@mui/material/Button";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import TableHeader from "./TableHeader";
import {
  handleGetAllUsers,
  handleGetAllCompany,
} from "../../../../services/userService";

import ModalConfirmDelete from "../ModalConfirmDelete";

import { breadcrumb } from "../../../../utils/constant";
import { handleBuildBreadCrumb } from "../../../Helper/BuildBBreadCrumb";
import { jwtDecode } from "jwt-decode";
import LogoutModal from "../../../inc/LogoutModal";
import { makeStyles } from "@material-ui/core/styles";

function descendingComparator(a, b, orderBy) {
  //b[orderBy] => cột ta cần sắp sếp => PhamDuyPhuoc hay TranQuocKhang với a,b là tất cả các trường

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
//Tham số : Mãng , với tham số thứ 2 là trường cần sort và chiều sort
function getWindowSize() {
  const { innerWidth } = window;
  return innerWidth;
}
export default function Datatable(props) {
  const history = useHistory();
  const [marginData, setMarginData] = React.useState(0);
  const isMounted = useRef(false);
  const access_token = useSelector((state) => state.user.access_token);
  const user = useSelector((state) => state.user.userInfo);
  const role = user.role;
  const company = user.company;
  const [listMotherCompany, setListMotherCompany] = React.useState([]);
  const [progress, setProgress] = React.useState(0);
  const [filterMotherCompany, setFilterMotherCompany] = React.useState({
    fn: (items) => {
      return items;
    },
  });
  const [qSearch, setQSearch] = React.useState("");
  const [motherCompany, setMotherCompany] = React.useState("");

  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [rowPerPageOptions, setRowPerPageOption] = React.useState([
    2, 5, 10, 15,
  ]);
  const [listUser, setListUser] = React.useState([]);
  const [filterfn, setFilterfn] = React.useState({
    fn: (items) => {
      return items;
    },
  });
  const [filterByCompany, setFilterByCompany] = React.useState({
    fn: (items) => {
      return items;
    },
  });
  const [userCurrent, setUserCurrent] = React.useState({});
  const [isShowModalDelete, setIsShowModalDelete] = React.useState(false);
  const space = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>;
  const [searchParams] = useState(["name", ""]);
  const [name, setName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const [isOpenLogoutModal, setIsOpenLogoutModal] = React.useState(false);

  const sortRowMotherCompany = () => {
    return filterMotherCompany.fn(listMotherCompany);
  };

  // const [windowSize, setWindowSize] = useState(getWindowSize());
  const [windowSize, setWindowSize] = useState();
  const searchMotherCompany = (e) => {
    let target = e.target;
    setQSearch(e.target.value);
    return setFilterMotherCompany({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter((item) => {
            if (
              item
                .trim()
                .toString()
                .toLowerCase()
                .indexOf(target.value.toLowerCase()) > -1
            ) {
              return item;
            }
          });
        }
      },
    });
  };
  const sortedRowInfomation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
    //Trả về 2 array là 0:{ name: "Tran Quoc Khang", age: 25 }, 1:{ name: "Pham Duy Phuoc", age: 32 },
    //Sau khi trả 2 array ta thực hiện sort chỗ mãng [0]
    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      //Order trả về 2 giá trị là 1 và -1
      if (order !== 0) {
        // console.log(order);
        return order;
      }
      //Sort theo thứ tự t dần
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el) => el[0]);
  };

  //=================================Search By Name
  const handleSearch = (e) => {
    let target = e.target ? e.target : "";
    setName(e.target.value);
    setFilterfn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter((item) => {
            return searchParams.some((newItem) => {
              return (
                item["name"]
                  .toString()
                  .toLowerCase()
                  .indexOf(target.value.toLowerCase()) > -1
              );
            });
          });
        }
      },
    });
  };

  //=================================Search By motherCompany
  const handleOnChangeSelect = (e) => {
    let target = e.target ? e.target : "";
    setMotherCompany(e.target.value);
    setFilterByCompany({
      fn: (items) => {
        if (target.value === "All") {
          return items;
        } else {
          return items.filter((item) => item.motherCompany === target.value);
        }
      },
    });
  };
  //Hàm slice giúp paging theo phần từ
  const listUserAfterSoftAndPaging = () => {
    return sortedRowInfomation(
      filterByCompany.fn(filterfn.fn(listUser)),
      getComparator(orderDirection, valueToOrderBy)
    );
  };

  //Sort từ component con
  const handelSortRequest = (event, property) => {
    //Nếu property truyền vào là asc hoặc chiều sort là asc
    const isAsc = valueToOrderBy === property && orderDirection === "asc";
    //Truyền vào proerty là age => sort theo property age
    setValueToOrderBy(property);
    setOrderDirection(isAsc ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleOnChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Lấy tất cả user
  const getAllUser = async () => {
    let res = await handleGetAllUsers(access_token);
    if (res && res.code === 200) {
      setIsLoading(false);
      setListUser(res.data);
    }
    if (res && res.message) {
      console.log(res.message);
    }
  };

  const getAllCompany = async () => {
    try {
      let arrMotherCompany = [];
      let newArrMotherCompany = [];
      let res = await handleGetAllCompany(access_token);
      if (res && res.code === 200) {
        res.data.map((item, index) => {
          arrMotherCompany.push(item.motherCompany);
        });
        //Lấy data từ bảng công ty chứa cả công ty meh
      }
      if (arrMotherCompany.length > 0) {
        for (let i = 0; i < arrMotherCompany.length; i++) {
          if (!newArrMotherCompany.includes(arrMotherCompany[i])) {
            newArrMotherCompany.push(arrMotherCompany[i]);
          }
        }
        setListMotherCompany(newArrMotherCompany);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteUser = (item) => {
    setIsShowModalDelete(!isShowModalDelete);
    setUserCurrent(item);
  };
  const toggleModalDeleteUser = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };

  React.useEffect(() => {
    let date = new Date();
    let newAccessToken = access_token !== "" ? access_token : "";
    let decodeToken = jwtDecode(newAccessToken);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        isMounted.current = true;
        getAllCompany();
        getAllUser();

        //Vào trang ta sẽ check window width
        window.addEventListener("resize", handleWindowResize);
        function handleWindowResize() {
          setWindowSize(getWindowSize());
          console.log("Check table user", windowSize);
          if (windowSize <= 475) {
            setMarginData(2);
          } else if (windowSize <= 450) {
            setMarginData(1);
          }
        }
        return () => {
          isMounted.current = false;
          window.removeEventListener("resize", handleWindowResize);
        };
      } else {
        setIsOpenLogoutModal(true);
        // return history.push("/admin/logout");
      }
    }
  }, []);

  //Truyền từ con về cha
  const onChangeWindowSize = (value) => {
    setWindowSize(value);
  };

  const arrLink = handleBuildBreadCrumb();
  return (
    <div className="content-wrapper mt-2">
      <LogoutModal
        className={"modalLogout"}
        isOpenLogoutModal={isOpenLogoutModal}
      />
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">{/* <h1>Thêm mới người dùng</h1> */}</div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                {arrLink &&
                  arrLink.length > 0 &&
                  arrLink.map((item, index) => {
                    let label = item.text;
                    return (
                      <Link
                        to={item.link}
                        key={index}
                        className={"breadcrumb-item"}
                      >
                        {breadcrumb.hasOwnProperty(item.text)
                          ? breadcrumb[label]
                          : breadcrumb[label]}
                        {/* <FormattedMessage id="breadcrumb.create" /> */}
                        {/* <FormattedMessage
                              id={
                                item.text === "user.create" ? "user.create" : ""
                              }
                            />
                            {item.text} */}
                      </Link>
                    );
                  })}
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-primary d-flex">
                <h3 className="card-title">Danh sách thành viên</h3>
              </div>
              <div className="card-body">
                <div className="row row-header">
                  <div className="col-md-3 col-6 ">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Tìm theo đơn vị
                      </InputLabel>

                      <Select
                        value={motherCompany}
                        label="Chọn công ty mẹ"
                        onChange={(e) => handleOnChangeSelect(e)}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              height: "250",
                              marginLeft: marginData,
                            },
                          },
                        }}
                      >
                        <MenuItem value={"All"} key={0} className="d-block">
                          Tất cả
                        </MenuItem>

                        {listMotherCompany.length > 0 &&
                          listMotherCompany.map((item, index) => {
                            return (
                              <MenuItem
                                value={item}
                                key={index + 1}
                                className="d-block"
                              >
                                {item}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </div>
                  {/* <div className="col-md-3"></div>
                      <div className="col-md-3"></div> */}
                  <div className="col-md-3 col-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Tìm theo tên"
                      style={{ width: "100" }}
                      onChange={(e) => {
                        handleSearch(e);
                      }}
                      value={name}
                    />
                  </div>
                </div>
                <div className="row row-body">
                  <TableContainer
                    component={Paper}
                    style={{ boxShadow: "none" }}
                  >
                    <div className="row row-body">
                      <Table
                        aria-label="simple table"
                        style={{ width: "100%" }}
                        className="table-responsive table"
                      >
                        <TableHeader
                          orderDirection={orderDirection}
                          valueToOrderBy={valueToOrderBy}
                          handelSortRequest={handelSortRequest}
                          windowSize={windowSize}
                          //Xử lí khi thay đổi windowSize
                          onChangeWindowSize={onChangeWindowSize}
                        />
                        <TableBody>
                          {listUserAfterSoftAndPaging()
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((item, index) => {
                              return (
                                //Xuất data và phân quyền user
                                <TableRow key={index}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{item.name}</TableCell>
                                  {window.innerWidth > 700 ||
                                  windowSize > 700 ? (
                                    <>
                                      <TableCell>{item.company}</TableCell>
                                      <TableCell>
                                        {item.motherCompany}
                                      </TableCell>
                                    </>
                                  ) : (
                                    ""
                                  )}

                                  <TableCell>{item.role}</TableCell>
                                  {/* <TableCell className="levelOfAdmin">
                                      {item.levelOfAdmin}
                                    </TableCell> */}

                                  {/* //==============================Với role admin được tất cả quyền */}
                                  {role === "Admin" &&
                                  window.innerWidth > 700 ? (
                                    <>
                                      <TableCell>
                                        <button
                                          className="button-edit-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/user/edit/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                          className="button-delete-user"
                                          onClick={() => {
                                            handleDeleteUser(item);
                                          }}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </button>
                                        <button
                                          className="button-view-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/user/view/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </TableCell>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {role === "Admin" &&
                                  window.innerWidth < 700 ? (
                                    <>
                                      <TableCell>
                                        <button
                                          className="button-view-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/user/view/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </TableCell>
                                    </>
                                  ) : (
                                    ""
                                  )}

                                  {/* //==============================Với role Moderator chỉ được quyền trong cùng nhà máy */}
                                  {role === "Moderator" &&
                                  company === item.company &&
                                  window.innerWidth > 700 ? (
                                    <>
                                      <TableCell>
                                        <button
                                          className="button-edit-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/user/edit/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                          className="button-delete-user"
                                          onClick={() => {
                                            handleDeleteUser(item);
                                          }}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </button>
                                        <button
                                          className="button-view-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/user/view/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </TableCell>
                                    </>
                                  ) : null}

                                  {role === "User" &&
                                  company === item.company ? (
                                    <>
                                      <TableCell>
                                        <button className="space">
                                          {space}
                                        </button>
                                        <button className="space">
                                          {space}
                                        </button>
                                        <button
                                          className="button-view-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/user/view/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </TableCell>
                                    </>
                                  ) : null}
                                  {role === "User" &&
                                  company !== item.company ? (
                                    <>
                                      <TableCell>
                                        <button className="space">
                                          {space}
                                        </button>
                                        <button className="space">
                                          {space}
                                        </button>
                                        <button
                                          className="button-view-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/user/view/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </TableCell>
                                    </>
                                  ) : null}
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={rowPerPageOptions}
                    component="div"
                    count={listUserAfterSoftAndPaging().length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleOnChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
          </div>
          {isLoading && <Progress />}
        </div>
      </section>

      {/* <Progress /> */}
      <div className="content-header">
        <div className="container-fluid">
          {isShowModalDelete ? (
            <ModalConfirmDelete
              isShowModal={isShowModalDelete}
              toggleFromParent={toggleModalDeleteUser}
              userCurrent={userCurrent}
              FetchUserAfterUpdate={getAllUser}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
