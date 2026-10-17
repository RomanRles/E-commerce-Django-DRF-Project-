function Footer() {
    return (
        <>
            <div className="container-fluid mt-5">
                <div className="mt-3 mb-5">
                    <h5>Buy Online at the best prices!</h5>
                </div>
                <div className="container-sm">
                    <div className="row row-cols-2">
                            <a className="col" href="#">My Account</a>
                            <a className="col" href="#">Home</a>
                            <a className="col" href="#">My Orders</a>
                            <a className="col" href="#">Categories</a>
                    </div>
                </div>
                <br></br>
                <div className="d-flex gap-3 mt-3">
                    <a href="#">Log In</a>
                    <a href="#">Create an Account</a>
                </div>
                
            </div>
        </>
    )
}

export default Footer;