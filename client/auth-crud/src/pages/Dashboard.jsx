import React from "react";
import { Avatar, Button, Card, Flex, Typography } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Check if userData exists before accessing its properties
  return (
    <Card className="profile-card">
      <Flex vertical gap="small" align="center">
        <Avatar size={150} icon={<UserOutlined />} className="avatar" />
        {userData && ( // Check if userData is not null
          <>
            <Typography.Title level={2} strong className="username">
              {userData.name}
            </Typography.Title>
            <Typography.Text type="secondary" strong>
              Email: {userData.email}
            </Typography.Text>
            <Typography.Text type="secondary">
              Role: {userData.role}
            </Typography.Text>
          </>
        )}
        <Button
          size="large"
          type="primary"
          className="profile-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Link to="/protected-content1">
          <Button type="default" className="profile-btn">
            Go to Protected Content 1
          </Button>
        </Link>
        <Link to="/protected-content2">
          <Button type="default" className="profile-btn">
            Go to Protected Content 2
          </Button>
        </Link>
      </Flex>
    </Card>
  );
};

export default Dashboard;
