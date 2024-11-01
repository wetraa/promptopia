import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col text-left">
      <h1 className="head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form
        className="w-full max-w-2xl mt-10 flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Prompt
          </span>
          <textarea
            className="form_textarea"
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            rows={5}
            placeholder="Write your prompt here..."
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags
          </span>
          <input
            className="form_input"
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="#study, #dev, #health"
          />
        </label>

        <div className="flex flex-end gap-5 mx-3">
          <Link href="/" className="text-grap-500">
            Close
          </Link>
          <button
            className="px-2 py-1.5 bg-primary-orange rounded-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
