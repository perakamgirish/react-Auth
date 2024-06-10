import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";

const useProtectedContent = () => {
  const { token } = useAuth();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchContent = async (url) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from context
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        setContent(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while fetching the content.");
    } finally {
      setLoading(false);
    }
  };

  return { content, error, loading, fetchContent };
};

export default useProtectedContent;
