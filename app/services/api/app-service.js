/* eslint-disable no-underscore-dangle */
import BaseService from "./_base-service";

class AppService extends BaseService {
  getCompanies(data) {
    let sort;
    if (data?.sort === "ascend") {
      sort = 1;
    } else if (data?.sort === "descend") {
      sort = -1;
    }

    return this.get(
      `/companies?page=${data?.page}&limit=${data?.limit}&status=${data?.status}&search=${data?.search}&sort=${sort}`,
    );
  }

  getReportSeparatedByCompany(tab, pagination) {
    const key = parseInt(tab?.queryKey[1], 10);
    // eslint-disable-next-line no-nested-ternary
    const status = key === 2 ? true : key === 3 ? false : undefined;
    return this.get(
      `/companies/campusSeparatedByReportType?status=${status}&page=${pagination?.page}&limit=${pagination?.limit}&search=${pagination?.search}&completed=${pagination.completed}`,
      {
        timeout: 1000000,
      },
    );
  }

  getAlUsers(data) {
    return this.get(
      `/users?page=${data?.page}&limit=${data?.limit}&status=${data?.status}&search=${data?.search}`,
    );
  }

  getCampuses(data) {
    let sort;
    if (data?.sort === "ascend") {
      sort = 1;
    } else if (data?.sort === "descend") {
      sort = -1;
    }

    return this.get(
      `/campuses?page=${data?.page}&limit=${data?.limit}&status=${data?.status}&search=${data?.search}&company_id=${data?.companyId}&sort=${sort}`,
    );
  }

  getCompanyTeam(data, companyId) {
    return this.get(
      `/companies/teams?companyId=${companyId}&page=${data?.page}&limit=${data?.limit}&${data?.searchedColumn}=${data?.searchText}&status=${data?.status}&search=${data?.search}`,
    );
  }

  addCompany(data) {
    return this.post("/companies", data);
  }

  // eslint-disable-next-line consistent-return
  getParticularCompany(id) {
    if (id) {
      return this.get(`/companies/${id}`);
    }
  }

  getParticularBuilding(id) {
    return this.get(`/buildings/${id}`);
  }

  getParticularCampus(id) {
    return this.get(`/campuses/${id}`);
  }

  addBuilding(data) {
    return this.post(`/buildings`, data);
  }

  addCampus(data) {
    return this.post(`/campuses`, data);
  }

  updateCompany(data) {
    return this.put(`/companies/${data.companyId}`, data);
  }

  addAndUpdateCompany(data) {
    console.log(data);
    if (data?._id) {
      return this.put(`/companies/${data._id}`, data);
    }
    // eslint-disable-next-line no-param-reassign
    delete data._id;
    return this.post("/companies", data);
  }

  updateCampus(data) {
    if (data?._id) {
      return this.put(`/campuses/${data._id}`, data);
    }
    // eslint-disable-next-line no-param-reassign
    delete data._id;
    return this.post("/campuses", data);
  }

  getRoles() {
    return this.get("/roles");
  }

  getBuildings(id) {
    return this.get(`/buildings?campusId=${id}&page=1&limit=50`);
  }

  getBuildingRooms(data) {
    return this.get(
      `/rooms?buildingId=${data.BuildingId}&departmentId=${data.departmentId}&${data?.searchedColumn}=${data?.searchText}&search=${data.search}&page=${data.page}&limit=${data.limit}&status=${data.status}`,
    );
  }

  getParticularRoom(room_id) {
    return this.get(`/rooms/${room_id}`);
  }

  getAllCampusesOfCompany(data) {
    return this.get(
      `/campuses?page=${data?.page}&limit=${data?.limit}&status=${data?.status}&company_id=${data?.companyId}`,
    );
  }

  updateUser(data) {
    return this.put(`/users/${data?._id}`, data);
  }

  deleteUser(data) {
    return this.delete(`/users/${data?._id}`, data);
  }

  addUser(data) {
    if (data?._id) {
      return this.put(`/users/${data?._id}`, data);
    }
    return this.post(`/users`, data);
  }

  UpdateRole(data) {
    return this.put(`/roles/${data?._id}`, data);
  }

  addWSSUser(data) {
    return this.post("/users", data);
  }

  removeUser(id) {
    return this.delete(`/users/${id}`);
  }

  searchCampuses(data) {
    return this.get(
      `/campuses/search?status=${data?.status}&search=${data?.search}`,
    );
  }

  searchCompanies(data) {
    return this.get(
      `/companies/search?status=${data?.status}&search=${data?.search}`,
    );
  }

  getCampus(id) {
    return this.get(`/campuses/${id}`);
  }

  getAllPermissions() {
    return this.get("/permission");
  }

  addRoles(data) {
    return this.post("/roles", data);
  }

  getAllRoles() {
    return this.get("/roles");
  }

  searchPermissions(data) {
    return this.get(
      `/permissions/search?status=${data?.status}&search=${data?.search}`,
    );
  }

  getReportElementsOfSpecificReportType(queryData) {
    const query = queryData?.queryKey[1];
    return this.get(
      `/reportElements/getReportElementsOfSpecificReportTypeInCampus?campus=${query?.campus}&report_type=${query.reportType}`,
    );
  }

  publishReports(data) {
    return this.put(`/reportElements/publishReports`, data, {
      timeout: 800000,
    });
  }

  downloadReports(data) {
    return this.get(
      `/publishedReports/latest?campus=${data?.campus}&report_type=${data?.report_type}`,
      data,
      {
        timeout: 600000,
      },
    );
  }

  getLogs(limit) {
    return this.get(`/logs?limit=${limit}`);
  }
}

export default new AppService();
