import { ButtonSetState, Logo } from "../"

export const FooterAuth = () => {
    return (
        <footer className="footerAuth">
            <div className="footerLeft">
                <Logo size={20} />
                <p>© 2026 Streaming Platform. All rights reserved.</p>
            </div>
            <div className="footerLinks">
                <ButtonSetState page='home' title='Home'/>
                <ButtonSetState page='about' title='About'/>
                <ButtonSetState page='blog' title='Blog'/>
                <ButtonSetState page='faq' title='FAQ'/>
                <ButtonSetState page='support' title='Support'/>
                <ButtonSetState page='privacy' title='Privacy'/>
                <ButtonSetState page='terms' title='Terms'/>
                <ButtonSetState page='cookies' title='Cookies'/>
                <ButtonSetState page='contact' title='Contact'/>
                <ButtonSetState page='careers' title='Careers'/>
                <ButtonSetState page='developers' title='Developers'/>
                <ButtonSetState page='api' title='API'/>
                <ButtonSetState page='status' title='Status'/>
            </div>
        </footer>
    )
}