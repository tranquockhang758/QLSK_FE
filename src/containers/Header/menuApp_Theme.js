export const adminMenu = [
  {
    //Quản lí người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.manage-user",
        subMenus: [
          {
            name: "menu.admin.manage-user",
            link: "/admin/users",
          },
          {
            name: "menu.admin.user-redux",
            link: "/admin/user-redux",
          },
          {
            name: "menu.system.system-administrator.user-login",
            link: "/admin/user-login",
          },
        ],
      },
    ],
  },

  {
    //Quản lí phòng khám
    name: "menu.admin.manage-clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        subMenus: [
          {
            name: "menu.admin.manage-clinic",
            link: "/admin/users",
          },
          {
            name: "menu.admin.admin-clinic",
            link: "/admin/user-redux",
          },
        ],
      },
    ],
  },

  {
    //Quản lí chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.specialty",
        subMenus: [
          {
            name: "menu.admin.specialty",
            link: "/admin/specialty",
          },
          {
            name: "menu.admin.manage-specialty",
            link: "/admin/manage-specialty",
          },
        ],
      },
    ],
  },

  {
    //Quản lí cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.handbook",
        subMenus: [
          {
            name: "menu.admin.handbook",
            link: "/admin/handbook",
          },
          {
            name: "menu.admin.manage-handbook",
            link: "/admin/manage-handbook",
          },
        ],
      },
    ],
  },
];
