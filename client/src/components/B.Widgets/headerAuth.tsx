import { ButtonSetState } from "../"

export const HeaderAuth = () => {
    return (
        <div className="headerAuth">
            <ButtonSetState page="home" title="Home"/>
            <ButtonSetState page="login" title="Login"/>
            <ButtonSetState page="register" title="Register"/>
        </div>
    )
}