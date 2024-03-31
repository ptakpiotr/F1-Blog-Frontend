import { IPost } from "../Types";
import SmallPost from "../components/SmallPost";

const posts: IPost[] = [
  {
    postId: "post1",
    authorName: "Linda",
    content: "Exploring the serene landscapes of Kyoto.",
    title: "A Journey Through Cherry Blossoms",
    photo:
      "https://images.unsplash.com/photo-1641654958798-2dee7f4c4474?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    postId: "post2",
    authorName: "Alex",
    content: "Delicious street food discoveries in Bangkok.",
    title: "Tasting Thailand",
    photo:
      "https://images.unsplash.com/photo-1641654958798-2dee7f4c4474?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    postId: "post3",
    authorName: "Sam",
    content: "Sunset reflections on the Amalfi Coast.",
    title: "Golden Hours in Positano",
    photo:
      "https://images.unsplash.com/photo-1641654958798-2dee7f4c4474?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    postId: "post4",
    authorName: "Emily",
    content: "Adventures in the Swiss Alps.",
    title: "Peak Experiences",
    photo:
      "https://images.unsplash.com/photo-1641654958798-2dee7f4c4474?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    postId: "post5",
    authorName: "Daniel",
    content: "Capturing the vibrant streets of Marrakech.",
    title: "Colors of Morocco",
    photo:
      "https://images.unsplash.com/photo-1641654958798-2dee7f4c4474?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function Posts() {
  return (
    <main>
      {posts.map((p) => (
        <SmallPost key={p.postId} {...p} />
      ))}
    </main>
  );
}

export default Posts;
