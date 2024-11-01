"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${session?.user.id}/posts?tag=${searchTag}`
      );
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id, searchTag]);
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    setTimeout(async () => {
      const hasConfirmedToDelete = confirm(
        "Are you sure you want to delete this prompt?"
      );
      if (hasConfirmedToDelete) {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      }
    });
  };
  const handleTagClick = (tag) => {
    setSearchTag(tag);
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleTagClick={handleTagClick}
    />
  );
};

export default ProfilePage;
