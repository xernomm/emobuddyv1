import { Footer } from "../components/Footer";
import { LoginForm } from "../components/Login/LoginForm";
import { CustomNavbar } from "../components/Navbar";

export function Login()
{
    return (
        <>
    <CustomNavbar activePage={""}/>
    <LoginForm />
    <Footer />
    </>
    )
}