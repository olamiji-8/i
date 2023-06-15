import React, { useEffect } from "react";
import "./Privacy.css";
import { Grid } from "@mui/material";
import ContactForm from "../../components/ContactForm";
import ContactMap from "../../components/ContactMap";
import CreateMemory from "../../components/CreateMemory/CreateMemory";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import OverLayHeader from "../../components/OverLayHeader/OverLayHeader";
// import "./ContactUs.css"
import { Helmet } from "react-helmet";

function Privacy() {
    useEffect(() => {
        window.scrollTo(0,0)
      }, [])
  return (
    <div>
      <Helmet>
        <title>Privacy - Create Tribute</title>
      </Helmet>
      <Navbar mobilebgColor="" bgColor="var(--sub-main)" iconColor="#76797F" />
      <OverLayHeader title="PRIVACY" />
      <div className="about_container">
        {/* <AboutUsCard/> */}

        <div className="privacy_title">
          {/* <h1 className="privacy_text">Privacy Policy</h1> */}
        </div>

        <div className="privacy_container">
          <div className="privacy_content">
            <h1 className="privacy_date">Last Updated: 02 Feb, 2021</h1>

            <p className="privacy_text_sub">
              We believe you should always know what data we collect from you
              and how we use it, and that you should have meaningful control
              over them. We want to help you make the best decisions about the
              information that you share with us. Please read the following
              privacy policy in full and carefully before using{" "}
              <a href="https://www.createtribute.com">
                {" "}
                https://www.createtribute.com
              </a>
            </p>

            <div className="genereal_content">
              <a href="/" className="general_title">
                GENERAL
              </a>

              <p className="general_main_content">
                You don't have to create an account to use some of our service
                features, such as searching and viewing public memorials. But,
                you need an account to create memorials, write tributes and
                stories and share images, of your loved ones that has passed
                away. <br /> <br />
                If you do choose to create an account, you must provide us with
                some personal data so that we can provide our services to you.
                On CreateTribute, these include your name, email address, the
                choice password for the site, among other information. All this
                information is considered 'Personally Identifiable Information"
                and is uniquely for each User and is not publicly available.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                INFORMATION WE COLLECT
              </a>

              <p className="general_main_content">
                When you open an account with CreateTribute, you provide us with
                personal information such as your name, email address, and other
                information. <br /> Account users may set up their personal
                profile, send messages, and perform searches on the site. <br />{" "}
                <br />
                CreateTribute provides service to clients by collecting
                information and searches they perform on the site. Users'
                contents while using CreateTribute can be viewed by the public
                and is generally available for the public. This information is
                not "Personal Information" and is not protected by this Privacy
                Policy, and users post content at their own risk and even copies
                of the contents may remain viewable in cached and archived pages
                or if other Users have copied or stored your User Content <br />{" "}
                <br /> But, you may control other users who choose to share
                those contents with; you can share with friends, families, and
                close ones. <br /> Users provide Personal Information about the
                deceased person they're creating a memorial for, which includes
                name, location, and date of birth, and date of death of the
                deceased person. <br /> <br /> Any improper collection or misuse
                of information provided on CreateTribute is a violation of the
                CreateTribute Terms of Use and should be reported to
                info@CreateTribute.com. By using CreateTribute, you are
                consenting to have your personal data transferred to and
                processed in Nigeria.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                HOW WE USE YOUR INFORMATION
              </a>

              <p className="general_main_content">
                We will use your information only as permitted by the law and
                subject to the terms of our Privacy Policy. Use of Personal
                Information:
              </p>
              <ol>
                <li className="general_main_content">
                  We do not sell or share your Personally Information with
                  unrelated third parties
                </li>
                <li className="general_main_content">
                  Users' Personally Information and other information will only
                  be used for the following purposes:
                  <ul>
                    <li className="general_main_content">
                      To provide the best services to Users, process
                      transactions and payments, communicate issues relating to
                      User's use of Our Services, identification, and
                      authentication.
                    </li>

                    <li className="general_main_content">
                      To communicate with you regarding Our Services
                    </li>

                    <li className="general_main_content">
                      For the administration and third party technical support
                      purposes, these parties are not allowed to disclose your
                      information
                    </li>
                  </ul>
                </li>

                <li className="general_main_content">
                  We may disclose Users' Personal Information under the
                  following situation:
                  <ul>
                    <li className="general_main_content">
                      To provide our service providers and contractors
                      information, in the event of this case, we will seek to
                      obtain confidentiality agreements from you.
                    </li>

                    <li className="general_main_content">
                      We may in good faith share Your Personal Information where
                      the law is required to do so and believe such actions are
                      required to comply with the law, protect Our Users,
                      protect against misuse or Our Services, and to protect Our
                      Terms of Services.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                USE OF ANONYMOUS INFORMATION
              </a>

              <p className="general_main_content">
                We collect some information automatically or through electronic
                tools to measure and track Our User traffic and improve Our
                Service experience. The following are ways we get anonymous
                information from Users
                <ul>
                  <li className="general_main_content">
                    <span>Cookies: </span>A cookie is a small piece of data that
                    is stored on your computer or mobile device. Like many
                    websites, We use cookies and similar technologies to collect
                    additional website usage data and to operate Our Services.
                    Although most web browsers automatically accept cookies,
                    many browsers' settings can be set to decline cookies or
                    alert you when a website is attempting to place an on your
                    computer. However, you may not be able to use Our Services
                    that require you to sign in or get our full-service offers.
                  </li>

                  <li className="general_main_content">
                    <span>IP Address: </span>We may obtain IP addresses from
                    users when they access our site. These are used for
                    different purposes such as diagnose problems, estimate the
                    number of users using our services in different geographic
                    locations, and to help prevent fraud.
                  </li>
                </ul>
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                PRIVACY ALERT
              </a>

              <p className="general_main_content">
                Your use of our services may disclose some personal information
                to the public. In cases where; <br />
                Users post contents: this will be available to the general
                public unless you choose whom to share the content with.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                OWNERSHIP
              </a>

              <p className="general_main_content">
                CreateTribute is the sole owner of all non-personal identifiable
                information they collect through the services.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                SECURITY MEASURES
              </a>

              <p className="general_main_content">
                The security and confidentiality of your Personal Identifiable
                Information are of great importance to us. We have put in place
                security measures and technologies to protect our guest's and
                User's information from unauthorized access and improper use.{" "}
                <br /> <br />
                We review our security measures from time to time to ensure safe
                usages for our guests and users. However, please know there is
                no security measure beyond penetration.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                CORRECTING OR UPDATING INFORMATION
              </a>

              <p className="general_main_content">
                You may correct or update the information you provided while
                using our services on the website or by contacting us through
                email.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                OPT-OUT PROCEDURES
              </a>

              <p className="general_main_content">
                Users may, at any time, stop or opt-out there account and
                services provided. This can be done by canceling the services on
                the website or directly sending an email to us.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                CHANGES TO THIS PRIVACY POLICY
              </a>

              <p className="general_main_content">
                We may revise this Privacy Policy from time to time. The most
                current version of the policy will govern our processing of your
                personal data and will always be at{" "}
                <a href="https://www.createtribute.com/privacy">
                  https://www.createtribute.com/privacy
                </a>{" "}
                If we make a change to this policy, in our sole discretion, we
                will notify you within CreateTribute.com.
              </p>
            </div>
          </div>
        </div>

        <CreateMemory/>
      <Footer/>
      </div>
    </div>
  );
}

export default Privacy;
