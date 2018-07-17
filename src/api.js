
const port = ()=>{
    if(window.location.port === '3000'){
        return ':5000'
    } else if(window.location.port.length > 0){
        return `:${window.location.port}`;
    } else {
        return '';
    }
};

const host = window.location.hostname+port();

const checkToken = `http://${host}/token`;
const api = `http://${host}/api/`;
const imgCDN = `http://${host}/images/`;
const noteCDN = `http://${host}/api/getnote/`;
const authURI = `http://${host}/auth`;

const Path = {
    host,
    checkToken,
    api,
    imgCDN,
    noteCDN,
    authURI
};

export default Path