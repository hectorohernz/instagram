import React from "react";
import './Styles.css' ;
const defaultState = {
    name: "",
    email: "",
    message: "",
    nameError: "",
    emailError: "",
};

class Form extends React.Component {
    state = defaultState;
    validate = () => {
        let nameError = "";
        let emailError = "";

        if (!this.state.name) {
            nameError = "Please fill out your Name";
        }

        if (!this.state.email.includes("@")) {
            emailError = "This email is not valid!";
        }

        if (nameError || emailError) {
            this.setState({ nameError, emailError });
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            //Clearing form
            this.setState(defaultState);
        }
    };
    render() {
        return (
            <React.Fragment>
                <div className="contenedor">
                    <h2 className="text-primary">Contact Us</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="forminput">
                            <label for="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                style={{ display: "block", width: '100%', height: '20%' }}
                                value={this.state.name}
                            />
                            <div className="validate">{this.state.nameError}</div>
                        </div>

                        <div className="forminput">
                            <label for="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                style={{ display: "block", width: '100%', height: '20%' }}
                                value={this.state.email}
                            />
                            <div className="validate">{this.state.emailError}</div>
                        </div>
                        <div className="forminput_message">
                            <label for="message">Message</label>
                            <textarea
                                placeholder="We would love to hear your feedback!"
                                name="message"
                                style={{ display: "block", width: '100%', height: '60%' }}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn"> Submit </button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Form;
