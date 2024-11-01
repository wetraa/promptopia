"use client";

import { useEffect, useState } from "react";

import PromptCard from "@components/PromptCard";
import { debounce } from "@libs/utils";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = debounce(searchText, 300);
  const [searchTag, setSearchTag] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let url = "/api/prompt?";
      if (searchTag) {
        url += `&tag=${searchTag}`;
        setSearchTag("");
      } else {
        url += `&search=${searchText}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [debouncedSearchText]);

  return (
    <section className="feed">
      <form className="relative w-full text-center">
        <input
          className="search_input peer"
          placeholder="Search for a prompt or a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={(tag) => {
          setSearchTag(tag);
          setSearchText(tag);
        }}
      />
    </section>
  );
};

export default Feed;

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layot flex flex-col gap-5">
      {data.map((post) => (
        <PromptCard
          post={post}
          key={post._id}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
