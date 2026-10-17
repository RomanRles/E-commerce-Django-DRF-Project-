// Register views Go here 
import RegisterForm from "../components/RegisterForm"
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
    return (
        <>
            <NavBar />
            <h1>You'll be Registered here!</h1>
            <RegisterForm />
            <Footer />
        </>
    )
}

export default Register;