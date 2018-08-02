import Constants from '../shared/constants';
import DataService from './dataService';

class UserService {
  constructor() {
    this.dataService = new DataService(Constants.WIKI_AUTH_KEY);
  }

  searchUsers(queryParams) {
    this.dataService.fetchOptions.method = 'GET';
    let searchUrl = Constants.WIKI_API_BASE;
    searchUrl += queryParams;
    // alert("Pending for approval users Requested: " + queryParams)
    return this.dataService.getJSON(searchUrl);
  }

  getUserDetail(id) {
    const url = `${Constants.WIKI_API_BASE}question/${id}`;
    return this.dataService.getJSON(url);
  }

  updateFcmToken(userId, fcmToken) {
    alert('data received at setc');
    this.dataService.fetchOptions.method = 'POST';
    const payload = { id: userId, fcmToken };
    const searchUrl = Constants.WIKI_API_BASE;
    return this.dataService.postJSON(searchUrl, payload);
  }
}

export default UserService;
