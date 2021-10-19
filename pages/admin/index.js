import Metatags from "../../components/Metatags"
import AuthCheck from "../../components/AuthCheck";

export default function AdminPostsPage({}) {
  return (
    <main>
      <AuthCheck>
        <Metatags title="admin page" />
        <h1>Posts</h1>
      </AuthCheck>
    </main>
  );
}
