import React, { component } from "react";
import './Footer.css'

export default function Footer() {
    return (
        <React.Fragment>

            <footer id="main-footer">

                <figure className="icons">

                    <div class="footer-container">
                        <ul class="list-inline" />
                        <li><a href="https://github.com/vangalan/instagram-redesign"><i class="fa fa-github fa-fw bg-github-footer" aria-hidden="true"></i></a></li>
                    </div>
                </figure>
                <p>Instagram &copy; 2020</p>

            </footer>

        </React.Fragment>

    )
}