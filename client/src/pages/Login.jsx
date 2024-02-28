import { Footer } from "../components/Footer";
import { LoginForm } from "../components/Login/LoginForm";
import { LoginNavbar } from "../components/LoginNavbar";
import { CustomNavbar } from "../components/Navbar";

export function Login()
{
    return (
        <>
        <LoginNavbar />
    <LoginForm />
    <Footer />
    </>
    )
}