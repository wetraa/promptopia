import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  await connectToDB();
  const usingUsername = request.nextUrl.searchParams.get("usingUsername");
  let searchTag = request.nextUrl.searchParams.get("tag")?.toLowerCase().trim();
  let creatorId;
  if (usingUsername) {
    const user = await User.findOne({ username: params.idOrUsername })
      .select("_id")
      .lean();
    creatorId = user ? user._id : null;
  } else {
    creatorId = params.idOrUsername;
  }
  let query = { creator: creatorId };
  if (searchTag) {
    if (searchTag[0] === "#") searchTag = searchTag.splice(1);
    query.tag = { $regex: new RegExp(`^#?${searchTag}$`, "i") };
  }
  const prompts = await Prompt.find(query).populate("creator");
  return new Response(JSON.stringify(prompts));
};
