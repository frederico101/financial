import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/customer");
            const data = response.data;
            setPosts(data);
            console.log("response => ", data);
        } catch (error) {
            console.log("error => ", error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []); // Pass an empty dependency array to run the effect only once on mount

    return (
        <div>
            {posts.map((post) =>(
                 
                    <div className="post" key={post.id}>
                        <h2>{post.Name}</h2>
                    </div>
                )
           )}
        </div>
    );
}

export default Home;
