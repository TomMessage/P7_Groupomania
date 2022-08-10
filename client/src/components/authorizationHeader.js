function authorizationHeader() {
    const token = localStorage.getItem('token');
    if(token) {
        return `Bearer ${token}`;
    } else {
        return {};
    }
}
export default authorizationHeader();