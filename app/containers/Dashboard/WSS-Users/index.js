/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect, useCallback } from "react";
import { Tabs, Button, Tag as AntdTag } from "antd";
import { useQuery, useMutation } from "react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Modal from "@/components/Modal";
import UserPopUp from "@/components/Modal/UserPopup";
import PageLayout from "@/containers/PageLayout";
import appService from "@/services/api/app-service";
import NotificationStatus from "@/components/Notification";
import Tag from "@/components/Tag";

import Table from "./Table";
import * as S from "./styled";

const { TabPane } = Tabs;

const schema = {
  _id: "",
  user_id: "",
  full_name: "",
  email: "",
  phone: "",
  role: "",
  is_active: true,
};

const Index = () => {
  const [initialValues, setInitialValues] = useState(schema);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [userData, setUserData] = useState(null);
  const [tabChangeKey, setTabChangeKey] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    status: undefined,
    search: "",
  });

  const Header = [
    {
      title: "Name",
      sorter: (a, b) => a.full_name?.length - b.full_name?.length,
      key: "full_name",
      render: (obj) => <span>{obj?.full_name}</span>,
    },
    {
      title: "Email",
      key: ["user", "email"],
      render: (text) => <span>{text?.user?.email}</span>,
    },
    {
      title: "Phone No.",
      key: "phone",
      render: (obj) => <span>{obj?.phone}</span>,
    },
    {
      title: "Role",
      key: ["role", "name"],
      render: (obj) => <span>{obj?.role?.name}</span>,
    },
    {
      title: "Permissions",
      key: ["permission", "name"],
      render: (obj) =>
        obj?.permission?.map((i) => <AntdTag>{`${i?.name}`}</AntdTag>),
    },
    {
      title: "Status",
      width: "10%",
      key: ["profile", "is_active"],
      render: (text) => (
        <Tag
          text={text?.is_active ? "Active" : "Disabled"}
          type={text?.is_active ? "success" : "error"}
        />
      ),
    },
    {
      title: "Edit",
      align: "center",
      key: "Edit",
      render: (record) => (
        <Button
          d={record.id}
          icon={<EditOutlined />}
          onClick={() => {
            setInitialValues({
              _id: record?._id,
              user_id: record?.user?._id,
              full_name: record?.full_name,
              email: record?.user?.email,
              phone: record?.phone,
              role: record?.role?._id,
              is_active: record?.is_active,
            });
            setVisible(true);
          }}
          size="medium"
        />
      ),
    },
    {
      title: "Delete",
      align: "center",
      key: "Delete",
      render: (record) => (
        <Button
          d={record.id}
          icon={<DeleteOutlined />}
          onClick={() => {
            setDeleteVisible(true);
            setInitialValues({
              _id: record?.user?._id,
              full_name: record?.full_name,
              email: record?.user?.email,
              phone: record?.phone,
              role: record?.role?._id,
              is_active: record?.is_active,
            });
          }}
          size="medium"
        />
      ),
    },
  ];

  const updateMutation = useMutation((data) => appService.updateUser(data), {
    onSuccess: (data) => {
      NotificationStatus("success", data?.message);
      refetch();
      setInitialValues(schema);
      setVisible(false);
    },
    onError: (err) => {
      NotificationStatus("error", err?.message);
      setVisible(false);
    },
  });
  const deleteUserMutation = useMutation(
    (data) => appService.deleteUser(data),
    {
      onSuccess: (data) => {
        NotificationStatus("success", data?.message);
        setDeleteVisible(false);
        refetch();
        setInitialValues(schema);
      },
      onError: (err) => {
        NotificationStatus("error", err?.message);
        setDeleteVisible(false);
      },
    },
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks

  useEffect(() => {
    const { state } = location;

    const status = String(state).split("=")[1];

    if (status === "undefined") {
      setTabChangeKey("1");
      setPagination({
        ...pagination,
        status: undefined,
      });
    } else if (status === "true") {
      setTabChangeKey("2");
      setPagination({
        ...pagination,
        status: true,
      });
    } else if (status === "false") {
      setTabChangeKey("3");
      setPagination({
        ...pagination,
        status: false,
      });
    }
  }, []);
  const fetchAllUsers = ({ limit = 10, page = 1, search = "", status }) =>
    appService.getAlUsers({ page, limit, status, search });

  const { isFetching, isLoading, refetch } = useQuery(
    ["users", pagination, tabChangeKey],
    () => fetchAllUsers(pagination),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setUserData(data);
      },
      // enabled: pagination,
    },
  );

  const [value, setValue] = React.useState("");
  const handleSearch = async (val) => {
    setPagination({
      ...pagination,
      search: val,
    });
  };

  const validationSchema = yup.object({
    full_name: yup.string().trim().required("*name is required"),
    email: yup.string().trim().required("*email is required"),
    phone: yup.string().min(10).max(10).trim().required("*Phone is required"),
    role: yup.string().trim().required("*role is required"),
    status: yup.boolean(),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: (values) => {
      const obj = { ...values };
      if (obj._id) {
        // update user
        updateMutation.mutate(values);
      } else {
        delete obj._id;
        addUser.mutateAsync(values);
      }
    },
  });

  useEffect(() => {
    if (!visible) {
      setInitialValues(schema);
      formik.handleReset();
    }
  }, [visible]);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append("status", pagination?.status);
    history.push({
      state: `status=${searchParams.get("status")}`,
    });
  }, [pagination]);
  function callback(key) {
    setPagination({
      ...pagination,
      page: 1,
      limit: 10,
      // eslint-disable-next-line
      status: key == 2 ? true : key == 3 ? false : undefined,
    });
    refetch();
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const addUser = useMutation((data) => appService.addWSSUser(data), {
    onSuccess: (values) => {
      setVisible(false);
      formik.handleReset();
      NotificationStatus("success", values?.message);
      refetch();
    },
    onError: (err) => {
      NotificationStatus("error", err?.message);
    },
  });

  // console.log(location);
  const handleTableChange = (pag, key) => {
    setPagination({
      limit: pag?.pageSize,
      page: pag?.current,
      search: value,

      // eslint-disable-next-line
      status: key === 2 ? true : key === 3 ? false : undefined,
      ...pag,
    });
  };

  const handleAddCompany = () => {
    formik.handleSubmit();
  };

  const handleVisible = () => {
    setVisible(true);
  };

  // eslint-disable-next-line consistent-return
  const showTitle = () => {
    // when add btn is clicked
    if (addUser.isLoading) {
      if (!formik.values._id) {
        return "Adding...";
      }
    }
    // when update btn is clicked
    else if (updateMutation.isLoading) {
      if (formik.values._id) {
        return "updating ...";
      }
    } else if (formik.values._id) {
      return "update";
    } else {
      return "Add";
    }
  };

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(initialValues);
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFn = useCallback(debounce(handleSearch), []);
  return (
    <>
      <PageLayout>
        <S.Wrapper>
          <Modal
            handleClick={handleDeleteUser}
            handleVisible={() => setDeleteVisible(true)}
            modalContent={<h1>Are you sure?</h1>}
            name="Delete User"
            noButton
            setVisible={setDeleteVisible}
            title={deleteUserMutation.isLoading ? "Deleting..." : "Delete"}
            visible={deleteVisible}
          />
          <div>
            <div
              className="header"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <h1 className="textCompany" style={{ fontSize: "24px" }}>
                  WSS Users
                </h1>
              </div>
              <div>
                <Modal
                  buttontitle="Add Users"
                  handleClick={handleAddCompany}
                  handleVisible={handleVisible}
                  modalContent={
                    <UserPopUp
                      formik={formik}
                      title={formik.values._id ? "Update User" : "Add User"}
                    />
                  }
                  name="ADD USERS"
                  setVisible={setVisible}
                  title={showTitle()}
                  visible={visible}
                />
              </div>
            </div>
            <div>
              <Tabs
                key={tabChangeKey}
                defaultActiveKey={tabChangeKey}
                onChange={callback}
              >
                <TabPane key="1" tab="  All Users  ">
                  <>
                    <Table
                      columns={Header}
                      data={userData?.data || []}
                      handleSearch={(e) => {
                        setValue(e.target.value);
                        optimizedFn(e.target.value);
                      }}
                      limit={pagination.limit}
                      loading={isFetching || isLoading}
                      onChange={(page) => handleTableChange(page, 1)}
                      page={pagination.page}
                      placeholder="Users"
                      total={userData?.total}
                      value={value}
                    />
                  </>
                </TabPane>
                <TabPane key="2" tab="ACTIVE">
                  <Table
                    columns={Header}
                    data={userData?.data || []}
                    handleSearch={(e) => {
                      setValue(e.target.value);
                      optimizedFn(e.target.value);
                    }}
                    limit={pagination.limit}
                    loading={isFetching || isLoading}
                    onChange={(page) => handleTableChange(page, 2)}
                    page={pagination.page}
                    placeholder="Users"
                    total={userData?.total}
                    value={value}
                  />
                </TabPane>
                <TabPane key="3" tab="DISABLED">
                  <Table
                    columns={Header}
                    data={userData?.data || []}
                    handleSearch={(e) => {
                      setValue(e.target.value);
                      optimizedFn(e.target.value);
                    }}
                    limit={pagination.limit}
                    loading={isFetching || isLoading}
                    onChange={(page) => handleTableChange(page, 3)}
                    page={pagination.page}
                    placeholder="Users"
                    total={userData?.total}
                    value={value}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </S.Wrapper>
      </PageLayout>
    </>
  );
};

export default Index;
