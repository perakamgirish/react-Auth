import React, { useEffect } from "react";
import useProtectedContent from "../hooks/UseProtechted";

const ProtectedContent1 = () => {
  const { content, error, loading, fetchContent } = useProtectedContent();

  useEffect(() => {
    fetchContent("http://localhost:2000/api/auth/protected-content1");
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {content && <p>{content}</p>}
    </div>
  );
};

export default ProtectedContent1;
