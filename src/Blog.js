import React, { createContext,useState ,useEffect, useContext } from 'react'
import { useSelector } from 'react-redux';
import  {  AuthContext } from './AuthProvider';
import './Blog.css';


import axios from 'axios';




const Blog = () => {
  const { state} = useContext(AuthContext);
  const { authToken } = state;
  const  { username } = state;
  const [ temp , setTemp ] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');

  const [blog , setBlog] = useState([[]]);
  const [user,  setUser] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('');
  const [blogCategories, setBlogCategories] = useState([]);
  
    //const authToken = localStorage.getItem('authToken');
  
    useEffect(() => {
      
      const fetchData = async () => {
      
        const response = await axios.get("https://api-staging-v2.sploot.space/api/v2/cms/post-categories", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }).then(response => { setBlog(response.data.data.data);
          setSelectedCategorySlug(response.data.data.data[0].slug);
        })
        .catch(error => { console.log(error); } );
         
        //console.log(response.data.data.data);
       
        setSelectedCategory(blog[0].slug);
        window.localStorage.setItem('blog',JSON.stringify(blog));
        console.log("hiii")
        setUser(username);
      };
      fetchData(); 
    } , [authToken]);

    useEffect(() => {
      const fetchBlogsByCategorySlug = async () => {
        try {
          const response = await axios.get(`https://api-staging-v2.sploot.space/api/v2/public/cms/post-categories/${selectedCategorySlug}`);
          setBlogCategories(response.data.data.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchBlogsByCategorySlug();
    },[selectedCategorySlug]);

    
  

    const handleCategoryClick = (slug) => {
      setSelectedCategory(slug);
      setSelectedCategorySlug(slug);
    };
    return (
      <div>
      <div className="navbar">< div className="image">{user}</div></div>
      <div className="category-list">
        <div className="category-scroller">
          {blog.map((category) => (
            <div
              key={category.id}
              className={
                "category-item" +
                (selectedCategory === category.slug ? " selected" : "")
              }
              onClick={() => handleCategoryClick(category.slug)}
            >
              <img src={category.imageUrl} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="blog-list">
        {blogCategories.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h3>{blog.title}</h3>
            <p>{blog.body}</p>
          </div>
        ))}
      </div>
    </div>
  
    
    );
  };

  export default Blog;