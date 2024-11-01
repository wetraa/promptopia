"use client";

import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";

const UserPage = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${params.username}/posts?usingUsername=true&tag=${searchTag}`
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [searchTag]);
  const handleTagClick = (tag) => {
    setSearchTag(tag);
  };
  return (
    <Profile
      name={params.username}
      desc=""
      data={posts}
      handleTagClick={handleTagClick}
    />
  );
};

export default UserPage;
