import NavBar from "../components/Navbar"
import Footer from "../components/Footer"
import LoginForm from "../components/LoginForm"

function Login() {
    return (
        <>
            <NavBar />
            <h1>Log in and start buying</h1>
            <LoginForm />
            <Footer />
        </>
    )
}

export default Login;