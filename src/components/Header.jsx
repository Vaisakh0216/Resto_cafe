import React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const Header = (props) => {
  const cartCount = useSelector((state) => state.cart.count);

  return (
    <div className="headerContainer">
      <h4>{props?.item?.branch_name}</h4>
      <div className="myOrderWrapper">
        <span>My Orders</span>
        <IconButton aria-label="cart">
          <Badge badgeContent={cartCount} color="error" showZero>
            <ShoppingCartIcon style={{ color: "white" }} />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
