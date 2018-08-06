import { constants } from 'zlib';
import Constants from '../shared/constants';
import DataService from './dataService';

class UserService {
  constructor() {
    this.dataService = new DataService(Constants.WIKI_AUTH_KEY);
  }

  getAdminAccessRequestedusers(queryParams) {
    this.dataService.fetchOptions.method = 'GET';
    let searchUrl = '';

    searchUrl = `${Constants.QUIZ_GENX_API_BASE}/admin/users`;

    // alert("Pending for approval users Requested: " + queryParams)
    return this.dataService.getJSON(searchUrl);
  }

  searchUsers(queryParams) {
    this.dataService.fetchOptions.method = 'GET';
    let searchUrl = '';
    if (queryParams == Constants.ADMIN_ACCESS_REQUEST) {
      searchUrl = `${Constants.QUIZ_GENX_API_BASE}/users`;
    }

    // alert("Pending for approval users Requested: " + queryParams)
    return this.dataService.getJSON(searchUrl);
  }

  getUserDetail(id) {
    const url = `${Constants.WIKI_API_BASE}/question/${id}`;
    return this.dataService.getJSON(url);
  }

  
  getLocalAccessToken(userId, email) {
    const url = `${Constants.QUIZ_GENX_API_BASE}/token`;
    const payload = {userId : userId, email : email};
    return this.dataService.postJSON(url, payload);
  }

  updateFcmToken(userId, fcmToken) {
    const payload = { type: Constants.FCM_TOKEN_UPDATE, id: userId, fcmToken };
    const usersUrl = `${Constants.QUIZ_GENX_API_BASE}/users/${userId}`;
    return this.dataService.putJSON(usersUrl, payload);
  }

  updateUserAccess(userId, accessResult) {
    const payload = { type: Constants.GRANT_ACCESS_REQUEST, id: userId, isAdmin: accessResult };
    const usersUrl = `${Constants.QUIZ_GENX_API_BASE}/users/${userId}`;
    return this.dataService.putJSON(usersUrl, payload);
  }

  updateAccessRequest(userId, name) {
    const payload = { type: Constants.ADMIN_ACCESS_REQUEST, id: userId, adminAccessRequested: true, displayName: name };
    const usersUrl = `${Constants.QUIZ_GENX_API_BASE}/users/${userId}`;
    return this.dataService.putJSON(usersUrl, payload);
  }
}

export default UserService;
