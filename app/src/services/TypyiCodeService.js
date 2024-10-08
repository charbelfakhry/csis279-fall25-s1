import http from  "../http-common";

const getTypyiCode = () =>
{
    return http.get(`/typyicode/getTypyiCode`);
}

const TypyiCodeService = {
    getTypyiCode,
   
}

export default TypyiCodeService;