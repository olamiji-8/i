import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import ContactForm from "../../components/ContactForm";
import ContactMap from "../../components/ContactMap";
import CreateMemory from "../../components/CreateMemory/CreateMemory";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import OverLayHeader from "../../components/OverLayHeader/OverLayHeader";
// import "./ContactUs.css"
import { Helmet } from "react-helmet";
import "./Terms.css";

function Terms() {
    useEffect(() => {
        window.scrollTo(0,0)
      }, [])
  return (
    <div>
      <Helmet>
        <title>Terms and Conditions - Create Tribute</title>
      </Helmet>
      <Navbar mobilebgColor="" bgColor="var(--sub-main)" iconColor="#76797F" />
      <OverLayHeader title="Terms & Conditions" />

      <div className="about_container">
        <div className="privacy_container">
          <div className="privacy_content">
            <h1 className="privacy_date">Last Updated: 02 Feb, 2021</h1>

            <p className="privacy_text_sub">
              These Terms and Conditions govern your access to and use of our
              services, including our website and email notifications and other
              covered services that link to these Terms ("Services"), and any
              content, text, links, graphics, photos, audio, or other materials
              uploaded, downloaded or appearing on the services (collectively
              referred to as "Material"). <br /> <br />
              By using the Services, you agree to be bound by these Terms.
            </p>

            <div className="genereal_content">
              <a href="/" className="general_title">
                WHO MAY USE THE SERVICES
              </a>

              <p className="general_main_content">
                You may use the Services only if you agree to form a binding
                contract with CreateTribute and are not a person barred from
                receiving services under the laws of the applicable
                jurisdiction. In any case, you must be at least 12 years old to
                use the services. If you are accepting these Terms and
                Conditions on behalf of a company, organization, or other legal
                entity, you represent and agree that you are authorized to do so
                and have the authority to bind such entity to these Terms, in
                which case the words "you" and "your" as used in these Terms
                shall refer to such entity.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                PRIVACY
              </a>

              <p className="general_main_content">
                Our Privacy Policy ({" "}
                <a href="https://www.createtribute.com/privacy">
                  https://www.createtribute.com/privacy
                </a>{" "}
                ) describes how we handle the information and data you provide
                to us when you use our services. You understand that through
                your use of the services, you consent to the collection and use
                of your information to provide you better services in the case
                of anonymous information; and to share your information if we
                are required to do so by law or we believe in good faith it is
                required to do.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                CONTENT ON THE SERVICES
              </a>

              <p className="general_main_content">
                You are responsible for your use of the services and for any
                Material you provide, including compliance with applicable laws,
                rules, and regulations. You should only provide Material that
                you are comfortable sharing with others. You agree not to share
                or submit any Material that:
                <ul>
                  <li className="general_main_content">
                    Contains Vulgar, hateful, abusive, or sexually explicit
                    language, attacks of a personal, sexual, racial or religious
                    nature, or expressions of bigotry, racism, discrimination,
                    or hate.
                  </li>

                  <li className="general_main_content">
                    Is threatening, false, misleading, defamatory, deceptive,
                    fraudulent, unfair or contains gross exaggeration or
                    unsubstantiated claims, violates party privacy rights
                    thirdly, is unreasonably harmful or offensive to any
                    individual or community, contains an actionable statement,
                    or tends to mislead or reflect unfairly on any other person,
                    business or entity.
                  </li>

                  <li className="general_main_content">
                    Unfairly interferes with the third party's uninterrupted use
                    and enjoyment of the services.
                  </li>

                  <li className="general_main_content">
                    Advertises, promotes, or trade any goods or services.
                  </li>

                  <li className="general_main_content">
                    Intended to promote a cause or movement, political,
                    religious, or other.
                  </li>

                  <li className="general_main_content">
                    Contains copyrighted content without the express permission
                    of the copyright owner.
                  </li>

                  <li className="general_main_content">
                    Constitutes, promotes illegal acts, the violation of any
                    right of individual, entity, violation of local, state
                    national or international laws
                  </li>

                  <li className="general_main_content">
                    Disclose any personal identifying information relating to or
                    images of a Minor without consent of a parent or guardian
                  </li>

                  <li className="general_main_content">
                    Contains viruses, harmful or destructive files.
                  </li>

                  <li className="general_main_content">
                    Links to any commercial website.
                  </li>

                  <li className="general_main_content">
                    Is not otherwise in compliance with these Terms and
                    Conditions of Use.
                  </li>
                </ul>
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                USER REPRESENTATIONS AND WARRANTIES
              </a>

              <p className="general_main_content">
                Each time you Submit Material to the Services, you represent and
                warrant that you have the right to submit the Material, which
                includes
                <ul>
                  <li className="general_main_content">
                    You are the author or owner of the Material
                  </li>

                  <li className="general_main_content">
                    The Material is not protected by copyright law
                  </li>

                  <li className="general_main_content">
                    You have the express permission of the copyright owner
                  </li>

                  <li className="general_main_content">
                    You have the right to grant CreateTribute the license
                    set out in these Terms of Use
                  </li>

                  <li className="general_main_content">
                    The Material you submit does not violate these Terms Of Use
                  </li>
                </ul>
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                USER LICENSE GRANT
              </a>

              <p className="general_main_content">
                You grant CreateTribute and related entities a royalty-free,
                perpetual, irrevocable, non-exclusive right, and license to
                copy, display, archive, store, publish, transmit, perform,
                distribute, reproduce and create derivative works from all
                Material you provide to CreateTribute in any form, media,
                software or technology of any kind now existing or developed in
                the future. You authorize CreateTribute to include the
                Material you provide in a searchable format that may be accessed
                by users of the services and other websites. <br /> <br />
                You also grant CreateTribute the right to use your name and
                any other information you provide about you, and you provide in
                connection with the use, <br /> <br />
                reproduction, or distribution of such Material. You also grant
                CreateTribute the right to use facts, ideas, concepts, or
                techniques contained in any Material you shared for any purpose
                whatsoever, including but not limited to marketing products and
                services. <br /> <br />
                You grant all these rights in this paragraph in consideration of
                your use of the services without the need for additional
                compensation of any sort to you. CreateTribute does not
                claim ownership of Material you submit to the services.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                DISCLAIMER OF RESPONSIBILITY FOR MATERIAL
              </a>

              <p className="general_main_content">
                You acknowledge and agree that CreateTribute does not
                control the Materials submitted to our services permitting
                user-generated Material and disclaims any responsibility for
                such Material. CreateTribute disclaims a duty to review,
                screen, remove, edit, or refuse to post any Online Memorial and
                Material. Also, CreateTribute does not guaranty that the
                information accessible through the services is accurate,
                complete, or current.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                REVIEW AND REMOVAL OF MATERIAL
              </a>

              <p className="general_main_content">
                CreateTribute reserves the right (but disclaims any duty,
                obligation, or responsibility) refuse to post, remove entirely,
                or edit (at any time, without prior notice) any Material or
                online memorial available through the services for any reason or
                no reason whatsoever, in its absolute and sole discretion.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                TERMINATION AND MODIFICATIONS TO THE SERVICES
              </a>

              <p className="general_main_content">
                CreateTribute reserves the right (but disclaims any duty,
                obligation, or responsibility) refuse to post, remove entirely,
                or edit (at any time, without prior notice) any Material or
                online memorial available through the services for any reason or
                no reason whatsoever, in its absolute and sole discretion. In
                the case where payment has already been made for the removed
                Material or memorial for reasons other than a breach of a
                section of
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                YOUR LICENSE TO USE THE SERVICES
              </a>

              <p className="general_main_content">
                CreateTribute gives you a personal, worldwide,
                non-assignable, and non-exclusive license to view and use the
                services. You may download, email, share via authorized social
                media application, print pages of the services in accordance
                with these Terms of Use and solely for your own personal,
                non-commercial use, provided you do not remove any trademark,
                copyright, or other notice contained on such pages. No other use
                is permitted.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                YOUR LICENSE TO USE THE SERVICES
              </a>

              <p className="general_main_content">
                CreateTribute gives you a personal, worldwide,
                non-assignable, and non-exclusive license to view and use the
                services. You may download, email, share via authorized social
                media application, print pages of the services in accordance
                with these Terms of Use and solely for your own personal,
                non-commercial use, provided you do not remove any trademark,
                copyright, or other notice contained on such pages. No other use
                is permitted.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                USER CONDUCT
              </a>

              <p className="general_main_content">
                You agree that your use of the services is subject to all
                applicable local, state, national or international laws and
                regulations. You also agree:
                <ul>
                  <li className="general_main_content">
                    To comply with Nigerian law and local laws and rules
                    regarding online conduct and acceptable Material.
                  </li>

                  <li className="general_main_content">
                    Not to use the Services for illegal purposes.
                  </li>

                  <li className="general_main_content">
                    Not to use the services to engage in commercial activates.
                  </li>

                  <li className="general_main_content">
                    Not to create Online Memorial with or for any commercial or
                    other purposes not in good faith in accordance with the
                    service. Also, not to deprive any family member, a friend of
                    a deceased person from establishing or using a service in
                    that person's name.
                  </li>

                  <li className="general_main_content">
                    Not to submit content or use the services without parent or
                    guardian consent for persons under the age of 12.
                  </li>

                  <li className="general_main_content">
                    Not to commit any act of infringement on the services.
                  </li>

                  <li className="general_main_content">
                    Not to interfere without a person's use and enjoyment of the
                    services.
                  </li>

                  <li className="general_main_content">
                    Not to upload Material that contains a virus, harmful or
                    disruptive files.
                  </li>

                  <li className="general_main_content">
                    Not to disrupt or violate the security of the services,
                    system resources, accounts, passwords, network, or servers
                    accessible through the services.
                  </li>

                  <li className="general_main_content">
                    Not to use the services for spamming or use of distribution.
                  </li>
                </ul>
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                ENDING THESE TERMS
              </a>

              <p className="general_main_content">
                You may end your legal agreement with CreateTribute at any
                time by deactivating your accounts and discontinuing your use of
                the services. This will take effect immediately. <br /> <br />
                We may suspend or terminate your account or cease providing you
                with all or part of the service any time for any or no reason,
                including but not limited to:
                <ul>
                  <li className="general_main_content">
                    You have violated these Terms
                  </li>

                  <li className="general_main_content">
                    You create risk or possible legal exposure for us
                  </li>

                  <li className="general_main_content">
                    Not to use the services to engage in commercial activates.
                  </li>

                  <li className="general_main_content">
                    Your account should be removed due to unlawful conduct
                  </li>

                  <li className="general_main_content">
                    If you believe your account was terminated or restricted in
                    error, you can file for an appeal through our Help Center.
                  </li>
                </ul>
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                INDEMNITY
              </a>

              <p className="general_main_content">
                You agree to indemnify and hold CreateTribute its agents,
                officers, or other employees harmless from any claim, damage, or
                demand made by anyone in connection with your use of the
                Services
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                DISCLAIMERS AND LIMITATIONS OF LIABILITY
              </a>

              <p className="general_main_content">
                <span style={{ fontWeight: "bold" }}>
                  The Services are Available "AS-IS"
                </span>{" "}
                <br /> <br />
                You understand and agree that the Services are provided to you
                on an "AS IS" and "AS AVAILABLE" basis. Without the foregoing,
                to the maximum extent permitted under applicable law, THE
                CreateTribute ENTITIES DISCLAIM ALL WARRANTIES AND
                CONDITIONS, WHETHER EXPRESS OR IMPLIED, OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. The
                CreateTribute makes no warranty or representation and
                disclaim all responsibility and liability, including but not
                limited to:
                <ul>
                  <li className="general_main_content">
                    The completeness, current, security, and accuracy of the
                    Services or Content
                  </li>

                  <li className="general_main_content">
                    For any removal or failure to upload any content
                  </li>

                  <li className="general_main_content">
                    Whether the Services will meet your requirements be
                    available on an uninterrupted basis
                  </li>

                  <li className="general_main_content">
                    Any harm to your computer system
                  </li>
                </ul>
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                LIMITATION OF LIABILITY
              </a>

              <p className="general_main_content">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE
                CreateTribute ENTITIES SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY
                LOSS OR DAMAGES, WHETHER IN AN ACTION UNDER CONTRACT,
                NEGLIGENCE, OR ANY OTHER THEORY, IN ANY MANNER ARISING OUT OF OR
                CONNECTION WITH THE USE, INABILITY TO USE OR PERFORMANCE OF THE
                SERVICES. CreateTribute ASSUMES NO RESPONSIBILITY AND SHALL
                NOT BE LIABLE FOR ANY DAMAGES TO, OR VIRUSES THAT MAY INFECT,
                YOUR COMPUTER SYSTEM OR OTHER PROPERTY ON ACCOUNT OF YOUR ACCESS
                OF THE SERVICE. CreateTribute ASSUMES NO RESPONSIBILITY OR
                LIABILITY IN ANY MANNER ARISING OUT OF OR IN CONNECTION WITH ANY
                INFORMATION, CONTENT, PRODUCTS , OR MATERIAL AVAILABLE ON OR
                THROUGH THE SERVICES.
              </p>
            </div>

            <div className="genereal_content">
              <a href="/" className="general_title">
                GENERAL
              </a>

              <p className="general_main_content">
                We may revise these Terms from time to time. The changes will
                not be retroactive, and the most current version of the Terms,
                which will always be at <a href="https://www.createtribute.com/terms_condition">https://www.createtribute.com/terms_condition</a> ,
                will govern our relationship with you. We will try to notify you
                of the materials revisions, for example, via a service
                notification or email associated with your account. By
                continuing to access or use the Services after those revisions
                become effective, you agree to be bound by the revised Terms.
                The laws of the Federal Republic Of Nigeria, these Terms of Use
                will be governed by and construes in accordance with the laws of
                the Federal Republic of Nigeria. In the event that any provision
                of the Terms is held to be invalid or unenforceable, then that
                provision will be limited or eliminated to the minimum extent
                necessary, and the remaining provisions of the Terms will remain
                in full force and effect. CreateTribute's failure to enforce
                ant right or provision of these Terms will not be deemed a
                waiver of such right or provision.
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

export default Terms;
