import React from 'react';

import { List, ListItemIcon, ListItemAvatar, ListSubheader, Avatar, ListItem, ListItemText, ListItemButton, IconButton, Collapse, Icon } from '@mui/material';

import { MusicNote, SkipNext, ExpandLess, ExpandMore, Folder, ErrorOutline } from '@mui/icons-material';

import database from './database.json';

export function findNextDrill(drills = {}, currentDrill = null) {
    const drillGroupKeys = Object.keys(drills);

    let flatten = [];

    drillGroupKeys.forEach((key) => {
        if(!drills[key] || !drills[key].items) return;
        flatten = flatten.concat(drills[key].items);
    });
    
    let drillIndex = flatten.indexOf(currentDrill);

    drillIndex++;

    let drill = flatten[drillIndex];

    return drill;
}

const DrillList = ({ onSelected }) => {

    const [currentDrill, setCurrentDrill] = React.useState(findNextDrill(database.drills));

    const onSelect = (drill, autoplay) => (e) => {
        e.stopPropagation();

        setCurrentDrill(drill);

        onSelected({
            autoplay,
            drill
        });
    };

    const onNextButtonClick = (e) => {
        e.stopPropagation();

        let drill = findNextDrill(database.drills, currentDrill);

        setCurrentDrill(drill);

        onSelected({
            autoplay: true,
            drill
        });
    };

    const groupKeys = Object.keys(database.drills);

    return (
        <ErrorBoundary>
        <List
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Drill Playlist
                    <IconButton onClick={onNextButtonClick} >
                        <SkipNext />
                    </IconButton>
                </ListSubheader>
            }
        >
            { groupKeys.map((groupKey) => (
                <DrillListGroup drills={database.drills[groupKey]} currentDrill={currentDrill} onSelect={onSelect} key={groupKey}></DrillListGroup>
            ))}
        </List>
        </ErrorBoundary>
    );
};

export function DrillListGroup({ drills = { items:[] }, onSelect=() => {}, currentDrill }) {

    const [ isOpen, setIsOpen ] = React.useState(false);

    React.useEffect(() => {
        if(!drills || !drills.items) return;

        if(drills.items.indexOf(currentDrill) >= 0) {
            setIsOpen(true);
        }

    }, [ drills, currentDrill ]);

    const onCollapseClick = (e) => {
        setIsOpen(!isOpen);
    };

    if(!drills || !drills.items) return;

    return (
        <>
            <ListItemButton onClick={onCollapseClick}>
                <ListItemIcon>
                    <Folder />
                </ListItemIcon>
                <ListItemText 
                    primary={drills.name}
                    secondary={drills.description}
                     />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen}>
                <List component="div" disablePadding>
                    {drills.items.map((drill) => (
                        <ListItem disablePadding key={drill.name}>
                            <ListItemButton onClick={onSelect(drill)} selected={currentDrill === drill}>
                                <ListItemAvatar onClick={onSelect(drill, true)}>
                                    <Avatar>
                                        <MusicNote />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={drill.name}
                                    secondary={drill.description}
                                />
                            </ListItemButton>

                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </>
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            <>
                <Icon>
                    <ErrorOutline />
                </Icon>
                <span>Something went wrong</span>
            </>
        )
      }
  
      return this.props.children; 
    }
  }

export default DrillList;