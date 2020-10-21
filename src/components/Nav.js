import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FlagIcon from "@material-ui/icons/Flag";
import HomeIcon from "@material-ui/icons/Home";
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    position: "absolute",
    bottom: 0,
  },
});

function Nav() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
      data-testid="Nav"
    >
      <BottomNavigationAction
        component={Link}
        to="/dashboard/"
        label="Home"
        icon={<HomeIcon />}
        data-testid="HomeTab"
      />
      <BottomNavigationAction
        component={Link}
        to="/dashboard/draft"
        label="Draft"
        icon={<FlagIcon />}
        data-testid="DraftTab"
      />
      <BottomNavigationAction
        component={Link}
        to="/dashboard/schedule"
        label="Schedule"
        icon={<CalendarTodayIcon />}
        data-testid="ScheduleTab"
      />
    </BottomNavigation>
  );
}

export default Nav;
