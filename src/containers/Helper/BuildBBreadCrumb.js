export const handleBuildBreadCrumb = () => {
  //Đường link có cấu trúc /admin/user/view; /admin/user/edit
  //Trả về mãng gồm những phần tử nhỏ
  //Split tạo thành mãng
  //http://localhost:3000/admin/view => slice 2 => lấy thông số phía sau là id
  var path = window.location.pathname.split("/").slice(2);
  //Lấy phần phía sau admin là user/list
  //Lấy ?id=8
  // let query = window.location.search.substring(1)
  //   ? "/" + window.location.search.substring(1)
  //   : "";
  let arrLink = [{ text: "admin", link: "/admin", label: "admin" }];
  for (let i = 0; i < path.length; i++) {
    let text = path[i];
    let link = arrLink[0].link + "/" + path.slice(0, i + 1).join("/");
    arrLink.push({ text: text, link: link });
    if (path.length >= 3) {
      if (i === path.length - 2) {
        //Ta phải update cho link chỗ edit
        //admin/user/edit/8 => tại vị trí thứ 2 của mãng là admin/user/edit phải thêm vào /8 cho trùng với link của app
        arrLink[path.length - 1].link =
          link + "/" + path.slice(path.length - 1);
        // console.log(arrLink);
      }
    }
  }
  return arrLink;
};
