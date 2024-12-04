import React from "react";
import { Tag, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { closeTab, setCurrentMenu } from "../../store/reducers/tab";
import "./index.css";

const CommonTag = () => {
  const tabsList = useSelector((state) => state.tab.tabList);
  const currentMenu = useSelector((state) => state.tab.currentMenu);
  const dispatch = useDispatch();
  const action = useLocation();
  const navigate = useNavigate();

  const handleClose = (tag, index) => {
    let length = tabsList.length - 1;
    dispatch(closeTab(tag));
    // Close other tags
    if (tag.path !== action.pathname) {
      return;
    }
    // Close the current tag
    if (index === length) {
      // Set the current data
      const currData = tabsList[index - 1];
      dispatch(setCurrentMenu(currData));
      navigate(currData.path);
    } else {
      // If there is at least one tag after current one
      if (tabsList.length > 1) {
        // Jump to next tag
        const nextData = tabsList[index + 1];
        dispatch(setCurrentMenu(nextData));
        navigate(nextData.path);
      }
    }
  };
  // Click the tag
  const handleChange = (tag) => {
    dispatch(setCurrentMenu(tag));
    navigate(tag.path);
  };
  // Reveal the tag
  const setTag = (flag, item, index) => {
    return flag ? (
      <Tag
        color="#55acee"
        closeIcon
        onClose={() => handleClose(item, index)}
        key={item.name}
      >
        {item.label}
      </Tag>
    ) : (
      <Tag onClick={() => handleChange(item)} key={item.name}>
        {item.label}
      </Tag>
    );
  };

  return (
    <Space className="common-tag" size={[0, 8]} wrap>
      {currentMenu.name &&
        tabsList.map((item, index) =>
          setTag(item.path === currentMenu.path, item, index)
        )}
    </Space>
  );
};

export default CommonTag;
