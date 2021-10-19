import styles from "../../styles/Post.module.css";
import PostContent from "../../components/PostContent";
import { useDocumentData } from "react-firebase-hooks/firestore";

import {
  getUserWithUsername,
  postToJSON,
  getPostPaths,
  getPostRef,
} from "../../lib/helpers";

// Tells Nextjs to fetch data from server at build time to pre-render page in advance
// Incremental Static Regeneration
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post, path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    // Used to refetch data on client-side when we want to hydrate it
    // to realtime data
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000, // Tells NextJS to regenerate page on server when requests come in during time interval (5000ms)
  };
}

// Tells NextJS which slugs to render w/ ISR
export async function getStaticPaths() {
  const paths = await getPostPaths();
  return {
    paths,
    // When user navigates to page that hasn't been rendered yet, this
    // tells NextJS to fallback to regular SSR. Once it renders page, then
    // it can be cached on CDN
    fallback: "blocking",
  };
}

export default function PostPage(props) {
  const postRef = getPostRef(props.path);
  const [realtimePost] = useDocumentData(postRef);

  // Realtime or server rendered post
  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </main>
  );
}
