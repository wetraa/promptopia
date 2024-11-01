"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      if (response.status != 200) router.push("/profile");

      const prompt = await response.json();
      setPost({
        prompt: prompt.prompt,
        tag: prompt.tag,
      });
    };
    if (promptId) fetchPost();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          //   userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
