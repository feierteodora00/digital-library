import React from "react";

class Login extends React.Component {

    render() {
        return (
            <div>
                <h3>Login page</h3>
                <p>Enter your credentials to access your account</p>
                <div className="login-form">
                    <div className="form-group">
                        <label>Email </label>
                        <input
                            className="form-control"
                            type='text'
                            placeholder='email'
                            value={this.props.email}
                            onChange={this.props.handleEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password </label>
                        <input
                            className="form-control"
                            type='password'
                            placeholder='password'
                            value={this.props.password}
                            onChange={this.props.handlePassword}
                        />
                    </div>
                    <br/>
                    <button onClick={this.props.handleLoginClick}>Log In</button>
                </div>
            </div>
        )
    }
}

export default Login;
