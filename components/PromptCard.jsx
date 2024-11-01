"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState(null);
  const handleCopy = () => {
    setCopied(post._id);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied(null);
    }, 3000);
  };
  return (
    <div className="prompt_card max-w-screen-sm">
      <div className="flex justify-between items-start gap-5">
        <Link
          href={
            post.creator._id === session?.user.id
              ? "/profile"
              : `/user/${post.creator.username}`
          }
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            className="rounded-full object-contain"
            src={post.creator.image}
            alt="User Image"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              @{post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post._id
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post._id ? "copy" : "tick"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 pt-3">
          <p
            className="font-inner text-sm geen_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inner text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
