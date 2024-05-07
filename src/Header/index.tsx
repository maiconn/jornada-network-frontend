import MenuApp from "../MenuApp";

interface HeaderProps {
    hideMenu?: boolean;
}
function Header({hideMenu}:HeaderProps) {
    return (
        <MenuApp hideMenu={hideMenu}/>
    );
}

export default Header;
