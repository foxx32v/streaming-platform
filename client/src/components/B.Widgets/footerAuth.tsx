import { Logo } from "../"

export const FooterAuth = () => {
    return (
        <footer className="footerAuth">
            <div className="footerLeft">
                <Logo size={20} />
                <p>© 2026 Streaming Platform. All rights reserved.</p>
            </div>
            <div className="footerLinks">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/blog">Blog</a>
                <a href="/faq">FAQ</a>
                <a href="/support">Support</a>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <a href="/cookies">Cookies</a>
                <a href="/contact">Contact</a>
                <a href="/careers">Careers</a>
                <a href="/developers">Developers</a>
                <a href="/api">API</a>
                <a href="/status">Status</a>
            </div>
        </footer>
    )
}