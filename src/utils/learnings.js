import { getPosts } from "./posts";
import { getrecipes } from "./recipes";

export const getLearnings = async () => {
    const posts = await getPosts();
    const recipes = await getrecipes();
    const learnings = [...posts, ...recipes].sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

    return learnings;
};