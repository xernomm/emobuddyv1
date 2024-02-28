import { Footer } from "../components/Footer";
import { LoginNavbar } from "../components/LoginNavbar";
import { CustomNavbar } from "../components/Navbar";
import Register from "../components/Register/Register";

export function RegisterPage()
{
    return (
        <>
        <LoginNavbar />
        <Register />
        <Footer />
        </>
    )
}