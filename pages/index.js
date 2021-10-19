import { useState } from "react";
import Metatags from "../components/Metatags";
import PostFeed from "../components/PostFeed";
import Loader from "../components/Loader";
import {
  getPostsCollection,
  getMorePostsCollection,
  postToJSON,
  fromMillis,
} from "../lib/helpers";

const POSTS_LIMIT = 1;

export async function getServerSideProps(context) {
  const postQuery = getPostsCollection(POSTS_LIMIT);

  const posts = (await postQuery.get()).docs.map(postToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts); // Use props rendered on server as initial value
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = getMorePostsCollection(POSTS_LIMIT, cursor);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < POSTS_LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags title={`Posts feed`} />
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}
      <Loader show={loading} />
      {postsEnd && "You have reached the end!"}
    </main>
  );
}
