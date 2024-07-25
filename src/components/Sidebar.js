import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Check } from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function IconMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const selectedStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    color: "primary.main",
  };

  const menuItems = [
    { text: "Single" },
    { text: "1.15" },
    { text: "Double" },
    { text: "Custom: 1.2" },
    { text: "Add space before paragraph" },
    { text: "Add space after paragraph" },
    { text: "Custom spacing..." },
  ];

  const renderMenuItems = menuItems.map((item, index) => (
    <MenuItem
      key={index}
      selected={selectedIndex === index}
      onClick={() => handleClick(index)}
      sx={selectedIndex === index ? selectedStyle : {}}
    >
      <ListItemText sx={{ margin: 0 }}>{item.text}</ListItemText>
      {selectedIndex === index && (
        <ListItemIcon sx={{ minWidth: 0, marginLeft: "auto" }}>
          <Check />
        </ListItemIcon>
      )}
    </MenuItem>
  ));

  return (
    <Paper sx={{ flex: 2, maxWidth: "100%" }}>
      <MenuList dense>
        <Typography variant="h6" component="h6" sx={{ padding: "8px 16px" }}>
          All Departments
        </Typography>
        {renderMenuItems.slice(0, 3)}
        <Divider />
        {renderMenuItems.slice(3, 5)}
        <Divider />
        {renderMenuItems.slice(5)}
      </MenuList>
    </Paper>
  );
}
