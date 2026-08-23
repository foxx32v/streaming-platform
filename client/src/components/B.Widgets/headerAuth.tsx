import { useAuthStore } from "@/src/store/"
import { ButtonSetState, Logo, ButtonSwitchTheme } from "../"

export const HeaderAuth = () => {
    const { isAuth } = useAuthStore()
    return (
        <div className="headerAuth">
            <div className="headerLeft">
            <Logo size={40} />
            <span className="headerTitle">PerepihoticWatch</span>
            </div>
            <div className="headerCenter">
            {isAuth == false && <ButtonSetState page="home" title="Home" />}
            <ButtonSetState page="feed" title="Feed" />
            <ButtonSetState page="trending" title="Trending" />
            <ButtonSetState page="categories" title="Categories" />
            <ButtonSetState page="about" title="About" />
            </div>
            <ButtonSwitchTheme/>
            {!isAuth ? <div className="headerRight">
            <ButtonSetState page="login" title="Login" />
            <ButtonSetState page="register" title="Register" />
            </div>:<div>
            <ButtonSetState page="logout" title="Logout" />
            </div>}
        </div>
    )
}