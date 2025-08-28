import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService.getPost(slug).then((data) => {
      if (data) setPost(data);
      else navigate("/");
    });
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (!post) return null;

  return (
    <div className="py-10">
      <Container>
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Post Image */}
          <div className="relative w-full overflow-hidden">
            <div className="w-full h-[450px] md:h-[550px] lg:h-[100%] overflow-hidden">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {isAuthor && (
              <div className="absolute top-5 right-5 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
            <div className="prose prose-lg max-w-none">{parse(post.content)}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
