import React, { Fragment } from "react";
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
import Select from "@mui/material/Select";
// import Button from "@mui/material/Button";

import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import TableHeader from "./TableHeader";
import {
  handleGetAllUsers,
  handleGetAllCompany,
  handleGetAllPost,
} from "../../../../services/userService";

import ModalConfirmDelete from "../ModalConfirmDelete";

import { handleBuildBreadCrumb } from "../../../Helper/BuildBBreadCrumb";
import { jwtDecode } from "jwt-decode";
import LogoutModal from "../../../inc/LogoutModal.js";
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
  const isMounted = useRef(false);
  const [marginData, setMarginData] = React.useState(0);
  const access_token = useSelector((state) => state.user.access_token);
  const user = useSelector((state) => state.user.userInfo);
  const role = user.role;
  const company = user.company;
  const idUser = user.id;
  const [listMotherCompany, setListMotherCompany] = React.useState([]);
  const [listUser, setListUser] = React.useState([]);
  const [progress, setProgress] = React.useState(0);
  const [filterMotherCompany, setFilterMotherCompany] = React.useState({
    fn: (items) => {
      return items;
    },
  });
  const [qSearch, setQSearch] = React.useState("");
  const [motherCompany, setMotherCompany] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [rowPerPageOptions, setRowPerPageOption] = React.useState([
    25, 50, 100, 200,
  ]);
  const [listPost, setListPost] = React.useState([]);
  const [listNewPost, setListNewPost] = React.useState([]);
  const [postCurrent, setPostCurrent] = React.useState([]);
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

  const [filterByCategory, setFilterByCategory] = React.useState({
    fn: (items) => {
      return items;
    },
  });

  const [isShowModalDelete, setIsShowModalDelete] = React.useState(false);
  const space = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>;
  const [searchParams] = useState(["title", ""]);
  const [title, setTitle] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);

  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  const [isOpenLogoutModal, setIsOpenLogoutModal] = React.useState(false);

  const [listArrUser, setListArrUser] = React.useState([]);

  // const [listCategory, setListCategory] = React.useState([]);
  const sortRowMotherCompany = () => {
    return filterMotherCompany.fn(listMotherCompany);
  };
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

  const searchCategory = (e) => {
    let target = e.target;
    setQSearch(e.target.value);
    return setFilterByCategory({
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

  const sortRowCategory = () => {
    return filterByCategory.fn(listPost);
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

  //=================================Search By Title
  const handleSearch = (e) => {
    let target = e.target ? e.target : "";
    setTitle(e.target.value);
    setFilterfn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter((item) => {
            return searchParams.some((newItem) => {
              return (
                item["author"]
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
    // console.log(target);
    setCategory(e.target.value);
    setFilterByCategory({
      fn: (items) => {
        if (target.value === "All") {
          return items;
        } else {
          return items.filter((item) => item.category === target.value);
        }
      },
    });
  };
  //Hàm slice giúp paging theo phần từ
  const listUserAfterSoftAndPaging = () => {
    return sortedRowInfomation(
      filterByCategory.fn(filterfn.fn(listPost)),
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

  //Lấy getListAuthor => Trả về list danh sách tác giả dựa vào mãng input đầu vào là id của user
  const getListAuthor = () => {
    let StringListAuthor = [];

    let newStringAuthor = [];
    let newArrAuthor = [];

    let listArrAuthor2 = [];
    let arrUser = [];
    let listArrAuthor = [];
    listPost.map((item, index) => {
      StringListAuthor.push(item.author);
    });
    if (StringListAuthor.length > 0) {
      for (let i = 0; i < StringListAuthor.length; i++) {
        //push vào mãng với id = id của listUser

        newStringAuthor.push(StringListAuthor[i].split("-"));
        newArrAuthor.push(newStringAuthor[i].filter((item) => item.length > 0));
      }

      for (let i = 0; i < newArrAuthor.length; i++) {
        if (newArrAuthor[i].length === 1) {
          let id = parseInt(newArrAuthor[i]);
          let user = listArrUser.filter((item) => item.id === id);
          listArrAuthor.push(user[0].name);
        } else if (newArrAuthor[i].length >= 2) {
          //Ta có mãng gồm 2 mãng con
          let newData = newArrAuthor[i].map((item) => {
            let id = parseInt(item);
            let userNow = listArrUser.filter((item) => item.id === id);
            arrUser.push(userNow[0].name);
          });

          listArrAuthor2.push(arrUser.join("-"));
        }
      }

      for (let i = 0; i < listArrAuthor2.length; i++) {
        listArrAuthor.push(listArrAuthor2[i]);
      }
      //Nếu có 2 id ta phải join thành 2 tên Trần Quốc Khang - Phạm Duy Phước
      const modifiedArray = listPost.map((item, index) => {
        return { ...item, newAuthor: listArrAuthor[index] };
      });
      // return modifiedArray;
      setIsLoading(false);
      setListPost(modifiedArray);
      // console.log("Check newpost", modifiedArray);
    }
  };
  const getListAuthor1 = (listPostAfterFilter) => {
    let StringListAuthor = [];

    let newStringAuthor = [];
    let newArrAuthor = [];

    let listArrAuthor2 = [];
    let arrUser = [];
    let listArrAuthor = [];
    listPostAfterFilter.map((item, index) => {
      StringListAuthor.push(item.author);
    });

    if (StringListAuthor.length > 0) {
      for (let i = 0; i < StringListAuthor.length; i++) {
        //push vào mãng với id = id của listUser

        newStringAuthor.push(StringListAuthor[i].split("-"));
        newArrAuthor.push(newStringAuthor[i].filter((item) => item.length > 0));
      }

      for (let i = 0; i < newArrAuthor.length; i++) {
        if (newArrAuthor[i].length === 1) {
          let id = parseInt(newArrAuthor[i]);
          let user = listArrUser.filter((item) => item.id === id);
          listArrAuthor.push(user[0].name);
        } else if (newArrAuthor[i].length >= 2) {
          //Ta có mãng gồm 2 mãng con
          let newData = newArrAuthor[i].map((item) => {
            let id = parseInt(item);
            let userNow = listArrUser.filter((item) => item.id === id);
            arrUser.push(userNow[0].name);
          });

          listArrAuthor2.push(arrUser.join("-"));
        }
      }

      for (let i = 0; i < listArrAuthor2.length; i++) {
        listArrAuthor.push(listArrAuthor2[i]);
      }

      //Nếu có 2 id ta phải join thành 2 tên Trần Quốc Khang - Phạm Duy Phước
      const modifiedArray = listPostAfterFilter.map((item, index) => {
        return { ...item, newAuthor: listArrAuthor[index] };
      });
      return modifiedArray;
    }
  };
  //Lấy tất cả user
  const GetAllPost = async () => {
    //Xử lí bài viết
    let StringAuthor = [];
    let newArrAuthor = [];
    let listArrAuthor2 = [];

    let listPostData = [];
    let listPostData1 = [];

    //Xử lí user
    let res = await handleGetAllPost(access_token);
    if (res && res.code === 200) {
      setIsLoading(false);
      let newListPost = res.data;
      // setIsLoading(false);
      //Ta có listPost => Chạy vòng
      res.data.map((item, index) => {
        StringAuthor.push(item.author.split("-"));
      });

      //Bước 1 ta xử lí lấy tất cả bài viết có id trùng với id của user
      for (let i = 0; i < StringAuthor.length; i++) {
        newArrAuthor.push(StringAuthor[i].filter((item) => item.length > 0));
      }
      for (let i = 0; i < newArrAuthor.length; i++) {
        if (newArrAuthor[i].length === 1) {
          let id = parseInt(newArrAuthor[i]);
          if (id === idUser) {
            listPostData.push(newListPost[i]);
          }
          //Nếu idUser === id của vị trị hiện tại
        } else if (newArrAuthor[i].length >= 2) {
          //Ta có mãng gồm 2 mãng con
          //Nếu mãng gồm 2 phần tử nhỏ
          //Ta có idUser
          newArrAuthor[i].map((item) => {
            let id = parseInt(item);
            if (id === idUser) {
              listPostData1.push(newListPost[i]);
            }
          });
        }
      }

      let newPostDataAfterFilter = [...listPostData, ...listPostData1];

      //Bước 2 ta xử lí cập nhật lại tên user theo author
      let newPostDataAfterFilter1 = getListAuthor1(newPostDataAfterFilter);
      setListPost(newPostDataAfterFilter1);
    }
    if (res && res.message) {
      console.log(res.message);
    }
  };

  // const getAllCompany = async () => {
  //   try {
  //     let arrMotherCompany = [];
  //     let newArrMotherCompany = [];
  //     let res = await handleGetAllCompany(access_token);
  //     if (res && res.code === 200) {
  //       res.data.map((item, index) => {
  //         arrMotherCompany.push(item.motherCompany);
  //       });
  //       //Lấy data từ bảng công ty chứa cả công ty meh
  //     }
  //     if (arrMotherCompany.length > 0) {
  //       for (let i = 0; i < arrMotherCompany.length; i++) {
  //         if (!newArrMotherCompany.includes(arrMotherCompany[i])) {
  //           newArrMotherCompany.push(arrMotherCompany[i]);
  //         }
  //       }
  //       setListMotherCompany(newArrMotherCompany);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const getAllUser = async () => {
    try {
      let arrUser = [];
      let newArrUser = [];
      let res = await handleGetAllUsers(access_token);
      if (res && res.code === 200) {
        res.data.map((item, index) => {
          arrUser.push({ id: item.id, name: item.name });
        });
        //Lấy data từ bảng công ty chứa cả công ty meh
      }
      if (arrUser.length > 0) {
        for (let i = 0; i < arrUser.length; i++) {
          if (!newArrUser.includes(arrUser[i])) {
            newArrUser.push(arrUser[i]);
          }
        }
        setListArrUser(newArrUser);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletePost = (item) => {
    setIsShowModalDelete(!isShowModalDelete);
    setPostCurrent(item);
  };
  const toggleModalDeleteUser = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };

  useEffect(() => {
    let date = new Date();
    let newAccessToken = access_token !== "" ? access_token : "";
    let decodeToken = jwtDecode(newAccessToken);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        isMounted.current = true;
        getAllUser();

        // if (listArrUser.length > 0) {
        //   GetAllPost();
        // }
        // GetAllPost();
        // getAllCompany();

        window.addEventListener("resize", handleWindowResize);
        function handleWindowResize() {
          setWindowSize(window.innerWidth);
        }
        return () => {
          window.removeEventListener("resize", handleWindowResize);
          isMounted.current = false;
        };
      } else if (decodeToken.exp < date.getTime() / 1000) {
        setIsOpenLogoutModal(true);
        // return history.push("/admin/logout");
      }
    }
  }, []);
  useEffect(() => {
    if (listArrUser.length > 0) {
      GetAllPost();
    }
  }, [listArrUser]);
  //Hàm lấy từ Header
  const onChangeWindowSize = (value) => {
    setWindowSize(value);
  };
  const arrLink = handleBuildBreadCrumb();
  return (
    <div className="content-wrapper">
      {/* <TableComponent></TableComponent> */}
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
                    return (
                      <Link
                        to={item.link}
                        key={index}
                        className={"breadcrumb-item"}
                      >
                        {item.text}
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
        <div className="row d-flex">
          <div className="col-md-12">
            <div className="card card-primary d-flex card-create">
              <div className="card-header">
                <h3 className="card-title">Danh sách sáng kiến</h3>
                <div className="col-md-6">
                  {/* <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div> */}
                </div>
              </div>
              <div className="card-body">
                <div className="row row-header">
                  <div className="col-md-3 col-6 ">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Tìm theo lĩnh vực
                      </InputLabel>
                      <Select
                        value={category}
                        label="Chọn công ty mẹ"
                        onChange={(e) => handleOnChangeSelect(e)}
                        MenuProps={{
                          // PaperProps: {
                          //   sx: {
                          //     bgcolor: 'pink',
                          //     '& .MuiMenuItem-root': {
                          //       padding: 2,
                          //     },
                          //   },
                          // },
                          PaperProps: {
                            sx: {
                              height: 200,
                              marginLeft: marginData,
                            },
                          },
                          MenuListProps: {
                            sx: {},
                          },
                        }}
                      >
                        <MenuItem value={"All"} className="d-block">
                          Tất cả
                        </MenuItem>

                        <MenuItem className="d-block" value={"IT"}>
                          Công nghệ thông tin
                        </MenuItem>
                        <MenuItem className="d-block" value={"DCS/SCADA"}>
                          DCS/SCADA
                        </MenuItem>
                        <MenuItem className="d-block" value={"Mechanical"}>
                          Cơ khí
                        </MenuItem>
                        <MenuItem className="d-block" value={"Auto"}>
                          Điện - tự động hóa
                        </MenuItem>
                        <MenuItem className="d-block" value={"HC"}>
                          Hành chính
                        </MenuItem>
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
                      value={title}
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
                                  <TableCell>{item.newAuthor}</TableCell>
                                  <TableCell>{item.title}</TableCell>
                                  {/* //Nếu window lớn hơn 700px */}
                                  {window.innerWidth > 700 ||
                                  windowSize > 700 ? (
                                    <>
                                      <TableCell>{item.description}</TableCell>
                                      <TableCell>{item.category}</TableCell>
                                    </>
                                  ) : (
                                    ""
                                  )}

                                  <TableCell>{item.view}</TableCell>
                                  {/* //==============================Với role admin được tất cả quyền */}
                                  {role === "Admin" &&
                                  window.innerWidth > 700 ? (
                                    <>
                                      <TableCell>
                                        <button
                                          className="button-edit-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/post/edit/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                          className="button-delete-user"
                                          onClick={() => {
                                            handleDeletePost(item);
                                          }}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </button>
                                        <button
                                          className="button-view-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/post/view/${item.id}`
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
                                              `/admin/post/view/${item.id}`
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
                                  company === item.company ? (
                                    <>
                                      <TableCell>
                                        <button
                                          className="button-edit-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/post/edit/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                          className="button-delete-user"
                                          onClick={() => {
                                            handleDeletePost(item);
                                          }}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </button>
                                        <button
                                          className="button-view-user"
                                          onClick={() =>
                                            history.push(
                                              `/admin/post/view/${item.id}`
                                            )
                                          }
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </TableCell>
                                    </>
                                  ) : null}
                                  {role === "Moderator" &&
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
                                              `/admin/post/view/${item.id}`
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
                                              `/admin/post/view/${item.id}`
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
                                              `/admin/post/view/${item.id}`
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
              postCurrent={postCurrent}
              FetchPostAfterUpdate={GetAllPost}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
