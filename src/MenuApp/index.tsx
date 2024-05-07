import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled,
    Toolbar,
    Typography
} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";
import {Assignment, AssignmentInd, ExitToApp, Home, Menu, MenuBook, People, ViewModule} from "@mui/icons-material";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "../store";
import {useNavigate} from "react-router-dom";
import {resetSession} from "../Login/actions";
import {convertStringToFoto} from "../Generic/functions";

const StyledBox = styled(Box)({
    width: 250,
    background: "#511",
    height: "100%"
});

function MenuApp({hideMenu, user, dispatch}: boolean & any & DispatchProp) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    if (!user) {
        return null;
    }

    const toggleSlider = () => {
        setOpen(!open);
    };

    const gotoHome = () => {
        navigate('/');
        toggleSlider();
    };


    const listItems = [
        {
            listIcon: <AssignmentInd/>,
            listText: "Perfil",
            click: () => {
                navigate('/edit-profile');
                toggleSlider();
            }
        },
        {
            listIcon: <Home/>,
            listText: "Home",
            click: () => {
                navigate('/home');
                toggleSlider();
            }
        },

        {
            listIcon: <People/>,
            listText: "Empresa",
            click: () => {
                navigate('/empresa');
                toggleSlider();
            }
        },

        {
            listIcon: <People/>,
            listText: "Personal",
            click: () => {
                navigate('/personal');
                toggleSlider();
            }
        },

        {
            listIcon: <ViewModule/>,
            listText: "Módulo",
            click: () => {
                navigate('/module');
                toggleSlider();
            }
        },
        {
            listIcon: <MenuBook/>,
            listText: "Atividade",
            click: () => {
                navigate('/activity');
                toggleSlider();
            }
        },
        {
            listIcon: <Assignment/>,
            listText: "Atividade Avaliação",
            click: () => {
                navigate('/activity-avaliation');
                toggleSlider();
            }
        },
        {
            listIcon: <ExitToApp/>,
            listText: "Sair",
            click: () => {
                resetSession(dispatch);
                navigate("/");
            }
        }
    ];


    const sideList = () => (
        <StyledBox component="div">
            <div style={{display: "flex", justifyContent: "center", marginTop: "1em"}}>
                <img
                    className="perfil"
                    src={convertStringToFoto(user ? user.foto : null)}
                    alt={user.nome}
                />
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <h4 style={{color: "tan"}}>{user.nome}</h4>
            </div>
            <Divider/>
            <List>
                {listItems.map((listItem, index) => (
                    <ListItem style={{color: "tan"}} button key={index} onClick={listItem.click}>
                        <ListItemIcon style={{color: "tan"}}>
                            {listItem.listIcon}
                        </ListItemIcon>
                        <ListItemText primary={listItem.listText}/>
                    </ListItem>
                ))}
            </List>
        </StyledBox>
    );

    return <Box component="nav" maxWidth="xs" className={"loginMain"} >
        <AppBar position="static">
            <Toolbar>
                {hideMenu ? '' : <IconButton onClick={toggleSlider}>
                    <Menu/>
                </IconButton>}

                <Typography onClick={gotoHome} style={{cursor: 'pointer'}}>Jornada</Typography>
                <Drawer open={open} anchor="left" onClose={toggleSlider}>
                    {sideList()}
                </Drawer>
            </Toolbar>
        </AppBar>
    </Box>
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(MenuApp);