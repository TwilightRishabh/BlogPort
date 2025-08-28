// import React, { useEffect, useState } from "react";
// import { Container, Postcard } from "../components";
// import appwriteService from "../appwrite/config";

// function AllPosts() {
//   const [post, setPosts] = useState([]);

// useEffect(() => {
//   appwriteService.getPosts().then((posts) => {
//     if (posts) {
//       setPosts(posts.documents);
//     }
//   });
// }, []);

//     return (
//         <div className="w-full py-8">
//             <Container >
//                 <div className="flex flex-wrap">
//                     {post.map((post)=>
//                     (
//                     <div key={post.$id} className="p-2 w-1/4" >
//                         <Postcard {...post} />
//                     </div>
//                     ))}
//                 </div>
//             </Container>
//       </div>
//   )
// }

// export default AllPosts;





import React, { useEffect, useState } from "react";
import { Container, Postcard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (isLoggedIn) {
      appwriteService.getPosts().then((res) => {
        if (res) {
          setPosts(res.documents);
        }
      });
    } else {
      setPosts([]);
    }
  }, [isLoggedIn]);

  // ✅ Agar user logged out hai → Message show karo
  if (!isLoggedIn) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-gray-700">
            🔒 Login to see all posts
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
