import React, { Component } from "react";
import { connect } from "react-redux";

import {
  handleGetAllUsers,
  handleGetAllCompany,
  handleGetAllPost,
} from "../../../../services/userService";

import _ from "lodash";

//============================================Jodit Editorr

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMotherCompany: [],
      arrUser: [],
      listPost: [],
    };
    //=====================Tạo ref cho input
    this.inputReference = React.createRef();
    this.inputReference1 = React.createRef();
  }

  //Lấy getListAuthor => Trả về list danh sách tác giả dựa vào mãng input đầu vào là id của user
  getListAuthor = (arrListUser) => {
    //newStringAuthor là mãng gồm 3 phần tử con
    let newStringAuthor = [];

    let newArrAuthor = [];
    let listArrAuthor = [];
    let listArrAuthor1 = [];
    let listArrAuthor2 = [];
    arrListUser.map((item, index) => {
      newStringAuthor.push(item.author);
    });
    console.log(newStringAuthor);
    //B1 kiểm tra xem mãng có không với mãng có dạng ["19-",,"24-25-"]
    // console.log("Check", StringListAuthor);
    // if (newStr   ingAuthor.length > 0) {
    //   newStringAuthor.pop();
    //   // Chay vòng for để chuyển id từ string thành int
    //   for (let i = 0; i < newStringAuthor.length; i++) {
    //     newArrAuthor.push(newStringAuthor[i]);
    //   }

    //   for (let i = 0; i < newArrAuthor.length; i++) {
    //     //Nếu trong mãng có nhiều hơn 1 phần tử
    //     let id = parseInt(newArrAuthor[i]);
    //     let user =
    //       arrListUser.length > 0
    //         ? arrListUser.filter((item) => item.id === id)
    //         : "";
    //     listArrAuthor.push({
    //       label: user ? user[0].name : "",
    //       value: user ? user[0].id : "",
    //     });
    //   }

    //   console.log(listArrAuthor);
    // }
  };
  getAllCompany = async () => {
    try {
      let arrMotherCompany = [];
      let newArrMotherCompany = [];
      let res = await handleGetAllCompany(this.praccess_token);
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
        this.setState({ motherCompany: newArrMotherCompany });
      }
    } catch (e) {
      console.log(e);
    }
  };
  getAllUser = async () => {
    try {
      let arrUser = [];
      let newArrUser = [];
      let res = await handleGetAllUsers(this.props.access_token);
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
        this.setState({ arrUser: newArrUser });
      }
    } catch (e) {
      console.log(e);
    }
  };
  GetAllPost = async () => {
    let res = await handleGetAllPost(this.props.access_token);
    if (res && res.code === 200) {
      //   setIsLoading(false);
      this.setState({ listPost: res.data });
    }
    if (res && res.message) {
      console.log(res.message);
    }
  };
  async componentDidMount() {
    //Call API ,Preloader
    this.GetAllPost();
    this.getAllCompany();
    this.getAllUser();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  ///==================================Tạo mới bài viết

  //======================================================Lấy url ảnh đại diện

  render() {
    let arrListUser = this.state.arrUser;
    if (arrListUser.length > 0) {
      this.getListAuthor(arrListUser);
    }

    return <></>;
  }
}
const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
