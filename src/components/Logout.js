import { fire } from "./fire.js";

const Logout = () => {
    fire.auth().signOut().then(function () {
    }).catch(function (error) {
    });
    localStorage.clear()
    window.location.href = "/";
};

export default Logout;