import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = featuredImage
    ? appwriteService.getFileView(featuredImage)
    : "/placeholder.jpg";

  return (
    <Link to={`/post/${$id}`}>
      <div className="group w-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Image */}
        <div className="relative w-full overflow-hidden">
          <div className="w-full h-52  md:h-64 lg:h-72 overflow-hidden  ">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
