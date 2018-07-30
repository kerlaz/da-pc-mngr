const protocol = window.location.protocol;
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

const checkToken = `${protocol}//${host}/token`;
const api = `${protocol}//${host}/api/`;
const imgCDN = `${protocol}//${host}/images/`;
const noteCDN = `${protocol}//${host}/api/getnote/`;
const authURI = `${protocol}//${host}/auth`;

const Path = {
    host,
    checkToken,
    api,
    imgCDN,
    noteCDN,
    authURI
};

export default Path