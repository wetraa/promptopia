import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  await connectToDB();
  const prompt = await Prompt.findById(params.id).populate("creator");
  if (!prompt) return new Response("Prompt not found", { status: 404 });

  return new Response(JSON.stringify(prompt));
};
export const PATCH = async (request, { params }) => {
  await connectToDB();
  const existingPrompt = await Prompt.findById(params.id);
  if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

  const { prompt, tag } = await request.json();
  existingPrompt.prompt = prompt;
  existingPrompt.tag = tag;
  await existingPrompt.save();
  return new Response(JSON.stringify(existingPrompt));
};
export const DELETE = async (request, { params }) => {
  await connectToDB();
  await Prompt.findByIdAndDelete(params.id);
  return new Response("Prompt deleted successfully");
};
