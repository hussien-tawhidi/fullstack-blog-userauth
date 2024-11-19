import CreateBlogPostForm from "@/components/forms/blog/CreateBlog";
import { auth } from "../../../../auth";
import MustBeLogin from "@/components/MustBeLogin";

const CreateBlogPost = async () => {
  const session = await auth();
  if (!session) {
    return (
      <MustBeLogin
        title='Opps you must be logged to your account or create new...'
        description='To CREATE ,UPDATE , DELETE your authentication needed'
      />
    );
  }
  return (
    <>
      <CreateBlogPostForm />
    </>
  );
};

export default CreateBlogPost;
