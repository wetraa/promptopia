import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  await connectToDB();
  const { userId, prompt, tag } = await request.json();
  const newPrompt = new Prompt({
    creator: userId,
    prompt,
    tag,
  });
  await newPrompt.save();
  return new Response(JSON.stringify(newPrompt), { status: 201 });
};

export const GET = async (request) => {
  await connectToDB();
  const searchText = request.nextUrl.searchParams
    .get("search")
    ?.toLowerCase()
    .trim();
  let searchTag = request.nextUrl.searchParams.get("tag")?.toLowerCase().trim();
  let prompts;
  const sorting = { _id: -1 };
  const limit = 15;
  if (searchTag) {
    if (searchTag[0] === "#") {
      searchTag = searchTag.splice(1);
    }
    prompts = await Prompt.find({
      tag: { $regex: new RegExp(`^#?${searchTag}$`, "i") },
    })
      .populate("creator")
      .sort(sorting)
      .limit(limit);
  } else if (searchText) {
    prompts = await Prompt.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: {
          path: "$creator",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            { prompt: { $regex: new RegExp(`${searchText}`, "i") } },
            { tag: { $regex: new RegExp(`^#?${searchText}`, "i") } },
            {
              "creator.username": {
                $regex: new RegExp(`^@?${searchText}`, "i"),
              },
            },
          ],
        },
      },
      {
        $sort: sorting,
      },
      {
        $limit: limit,
      },
    ]);
  } else {
    prompts = await Prompt.find({})
      .populate("creator")
      .sort(sorting)
      .limit(limit);
  }
  return new Response(JSON.stringify(prompts));
};
