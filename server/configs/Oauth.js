//for using o auth express open id connect libvrary is used 

const {auth} =require("express-openid-connect");

const config = {
  //show every route erqure authenctication
    authRequired: false,
    auth0Logout: true,
    secret: 'nikankhadkaasdfasfsdafsadfeasdceadfaedsafafefsaddcsdfaefdsf',
    baseURL: 'http://localhost:2900',
    clientID: 'aVpug2cvgR8azSRQ1EtBNlnrIj0hF8WO',
    issuerBaseURL: 'https://dev--dvftwly.us.auth0.com'
  };

  //export auth config to register it in express applcation
module.exports=auth(config);