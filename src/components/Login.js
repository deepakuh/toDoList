import { GoogleLogin } from '@react-oauth/google';

const clientId = "485360228522-hijvrokt3gv2be7jva09qusud8o9i7mi.apps.googleusercontent.com"

function Login(){

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileobj);
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }


    return(
        <div id="loginClick">
        <GoogleLogin
        clientId={clientId}
        buttenText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
/>;

        </div>
    )
}

export default Login;