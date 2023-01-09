// eslint-disable-next-line import/no-cycle
import BaseService from "./_base-service";

class AuthService extends BaseService {
  login(data) {
    return this.post("/login", data);
  }

  passwordEmail(data) {
    return this.post("/requestPassword", data);
  }

  getProfile() {
    return this.get(`/profiles/getOwnProfile`);
  }

  validatePasswordLink(token) {
    return this.get(`/validatePasswordLink?token=${token}`);
  }

  passwordReset(data) {
    return this.put(`/changePassword`, data);
  }
}

export default new AuthService();
