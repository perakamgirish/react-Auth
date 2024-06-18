import React, { useEffect } from "react";
import useProtectedContent from "../hooks/UseProtechted";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";

const ProtectedContent2 = () => {
  const { content, error, loading, fetchContent } = useProtectedContent();

  useEffect(() => {
    fetchContent("http://localhost:2000/api/auth/protected-content2");
  }, []);

  return (
    <div>
      <Card className="profile-card">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {content && <p>{content}</p>}

        <Link to="/Dashboard">
          <Button type="primary" className="profile-btn">
            Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default ProtectedContent2;
