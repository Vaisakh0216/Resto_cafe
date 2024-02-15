import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Counter from "./Counter";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Options(props) {
  const [value, setValue] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [startX, setStartX] = React.useState(0);
  const [tabScroll, setTabScroll] = React.useState(0);

  React.useEffect(() => {
    setSelectedCategory(props?.item?.table_menu_list[0]?.category_dishes);
  }, [props]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    const currentX = event.touches[0].clientX;
    const difference = startX - currentX;
    const containerWidth = event.currentTarget.getBoundingClientRect().width;
    const tabWidth = containerWidth / props.item.table_menu_list.length;

    if (Math.abs(difference) > 20) {
      const newScroll = tabScroll + difference;
      if (newScroll > 0 && newScroll <= containerWidth - tabWidth) {
        setTabScroll(newScroll);
      }
      setStartX(currentX);
    }
  };

  console.log(selectedCategory);

  return (
    <Box className="tabsContainer" sx={{ width: "100%", overflowX: "auto" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setStartX(0)}
        style={{ transform: `translateX(-${tabScroll}px)` }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {props?.item?.table_menu_list.map((menus, index) => (
            <Tab
              key={index}
              onClick={() => setSelectedCategory(menus?.category_dishes)}
              label={menus?.menu_category}
              {...a11yProps(index)}
              style={{
                color: value === index ? "red" : "white",
                textTransform: "inherit",
              }}
            />
          ))}
        </Tabs>
      </Box>
      {selectedCategory?.map((item, itemIndex) => (
        <div key={itemIndex}>
          <CustomTabPanel value={value} index={value}>
            <div
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4>{item?.dish_name}</h4>
                <span style={{ fontSize: "14px" }}>
                  {item?.dish_currency} {item?.dish_price}
                </span>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#3a4555",
                  }}
                >
                  {item?.dish_description}
                </p>
                <Counter />
                <span
                  style={{
                    color: "red",
                    fontSize: "10px",
                    fontWeight: "400",
                    marginTop: "15px",
                  }}
                >
                  {item?.dish_Availability && item?.addonCat?.length
                    ? "Customization available"
                    : !item?.dish_Availability
                    ? "Not available"
                    : ""}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 400 }}>
                  {item?.dish_calories} Calories
                </span>
                <img
                  src={item?.dish_image}
                  style={{
                    width: "150px",
                    height: "150px",
                    marginLeft: "10px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          </CustomTabPanel>
          <Divider
            style={{
              backgroundColor: "#0b121d",
              height: "1.5px",
            }}
          />
        </div>
      ))}
    </Box>
  );
}
