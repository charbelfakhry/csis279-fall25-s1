
const getToken = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    return token;
  };

const getTokenBearer = () => {
  const token = getToken();
  return `Bearer ${token}`;
}

module.exports = {
    getToken,
    getTokenBearer,
}