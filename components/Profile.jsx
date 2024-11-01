import PromptCard from "@components/PromptCard";

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  handleTagClick,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layot flex flex-col gap-5">
        {data.map((post) => (
          <PromptCard
            post={post}
            key={post._id}
            handleEdit={() => {
              handleEdit && handleEdit(post);
            }}
            handleDelete={() => {
              handleDelete && handleDelete(post);
            }}
            handleTagClick={() => handleTagClick && handleTagClick(post.tag)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
