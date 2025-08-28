// import React, { useEffect, useState } from 'react'
// import { Container, Postcard } from '../components'
// import appwriteService from '../appwrite/config'


// function Home() {

//     const [posts, setposts] = useState([])
    
//     useEffect(() => {
//         appwriteService.getPosts().then((posts) =>
//         {
//             if (posts)
//             {
//                 setposts(posts.documents)
//             }
//         })
//     }, [])
    
//     if (posts.length === 0)
//     {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className=" text-2xl font-bold  hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//   return (
//       <div className='w-full py-8' >
//           <Container>
//               <div className="flex flex-wrap">
//                   {posts.map((post) => (
//                       <div key={post.$id} className='p-2 w-1/4' >
//                           <Postcard {...post} />
                          
//                       </div>
                      
//                   ))}
//               </div>
//           </Container>
//     </div>
//   )
// }

// export default Home



import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // ✅ Redux se auth status lene ke liye
import { Container, Postcard } from "../components";
import appwriteService from "../appwrite/config";

function Home() {
  const [posts, setPosts] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.status); // ✅ Login check

  useEffect(() => {
    if (isLoggedIn) {  // ✅ Sirf tab fetch karo jab user logged in ho
      appwriteService.getPosts().then((posts) => {
        if (posts) setPosts(posts.documents);
      });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold hover:text-gray-500">
            🔒 Login to read posts
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

export default Home;
