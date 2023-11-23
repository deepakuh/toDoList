import { GoogleLogout } from '@react-oauth/google';

const clientId = "485360228522-hijvrokt3gv2be7jva09qusud8o9i7mi.apps.googleusercontent.com"

function Logout(){

    const onSuccess =() => {
        console.log("Logout successfull");
    }

    return(
        <div id="logoutClick">
        <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onsuccess}
        />
        </div>
    )

}

export default Logout;