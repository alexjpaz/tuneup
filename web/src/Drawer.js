import React from 'react';

import { Box, IconButton, Drawer, ClickAwayListener, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home as HomeIcon, Menu as MenuIcon, Elderly as LegacyIcon } from '@mui/icons-material';

import { useNavigate } from "react-router-dom";

function MainDrawerItems() {

    const navigate = useNavigate();

    return (
        <List>
            <ListItem key={"text"} disablePadding>
                <ListItemButton onClick={() => navigate("/")}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItemButton>
            </ListItem>
            <ListItem key={"text"} disablePadding>
                <ListItemButton onClick={() => navigate("/legacy")}>
                    <ListItemIcon>
                        <LegacyIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Legacy"} />
                </ListItemButton>
            </ListItem>
        </List>
    );
}

function MainDrawer() {
    const [open, setOpen] = React.useState(false);


    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };

    return (
        <>
            <Box sx={styles.menu} data-testid="main-menu">
                <IconButton onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
            </Box>
            <Drawer
                anchor={"left"}
                open={open}
                onClose={() => { }}
            >
                <ClickAwayListener onClickAway={toggleDrawer(false)}>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <MainDrawerItems />
                    </Box>
                </ClickAwayListener>
            </Drawer>
        </>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 0,

    },
    topFlex: {
        flex: 4,
        overflow: "hidden",
        display: "flex",
    },
    bottomFlex: {
        flex: 5,
        overflow: "auto",

    },
    menu: {
        position: "fixed",
        left: "1rem",
        top: "1rem",
    }
};

export default MainDrawer;