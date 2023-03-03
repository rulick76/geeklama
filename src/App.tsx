
import React ,{useState,useEffect} from 'react'
import axios , { AxiosResponse } from 'axios';
import Post from './models/post'
import Comment from './models/comment'
import CardNav from './components/cardNav'
import './App.css';

interface PostWithComments extends Post {
  comments: Comment[];
}

interface PostsContextProps {
  posts: PostWithComments[];
}

export const PostsContext = React.createContext<PostsContextProps>({
  posts: [],
});

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [posts, setPosts] = useState<PostWithComments[]>([]);

  useEffect(() => {
    axios.get<PostWithComments[]>('http://localhost:3000')
        .then((response: AxiosResponse<PostWithComments[]>) => {
            setPosts(response.data)
            setLoading(false)
            setError('')
        })
        .catch((error: any) => {
            setPosts([])
            setError(error.message)
            setLoading(false)
        });
    },[])
  
  return ( 
    <div className='App'>
      
        {loading ? (
          <p>Loading...</p>
        ) : (
          <PostsContext.Provider value={{posts}}>
            <CardNav></CardNav>
          </PostsContext.Provider>
        )}
      
    </div>
  )
}

export default App;
