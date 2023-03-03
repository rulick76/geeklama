import React, { useContext } from 'react'
import { Card, CardContent, Typography, Box, IconButton, Button, TextField } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos, Label } from '@mui/icons-material';
import Rate from '@mui/material/Rating';
import CommentList from './commentList'
import { PostsContext } from '../App';
import Comment from '../models/comment'
import CommentDialog from '../components/commentDialog'

interface PostCommentsProps {
  comments: Comment[];
}

export const PostIndexContext = React.createContext(0)

export const PostContext = React.createContext<PostCommentsProps>({
  comments: [],
});

function CardNav() {

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { posts } = useContext(PostsContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const [postData, setPostData] = React.useState({
    name: '',
    field: '',
    rate: 2.5
  });

  const handleOpen = () => {
    setIsOpen(true)
  };

  const handleAddPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPost={
      _id:"",
      name: postData.name,
      field: postData.field,
      rate: 2.5,
      comments:[]
    }
    posts.push(newPost);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    });
  };



  const handleClose = (comment:Comment) => {
    setIsOpen(false)
    const newComment={
      date: comment.date,
      title: comment.title,
      case: comment.case,
      rate: comment.rate
    }
    
    posts[currentIndex].comments.push(newComment);
    //Save to mongo here ?
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === posts.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    posts.length > 0 ? (
    <Box display="flex" flexDirection="row">
      <Box display="flex" alignItems="left" alignContent="left">
        <Box display="flex" flexDirection="column" alignItems="left" alignContent="left">
          <Card sx={{ width: 500, height: 260, marginTop: 5 ,marginLeft:5}}>
            <CardContent>
              <Typography variant="h5" component="div">
                {posts[currentIndex].name}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {posts[currentIndex].field}
              </Typography>
              <Rate disabled={true} value={posts[currentIndex].rate} defaultValue={2.5} precision={0.5}></Rate>
            </CardContent>
            <IconButton onClick={handlePrevClick}>
              <ArrowBackIosNew />
            </IconButton>
            <IconButton onClick={handleNextClick}>
              <ArrowForwardIos />
            </IconButton>
            <Button variant="outlined" color="primary" style={{ float: 'right', marginRight: 10 }}
              onClick={handleOpen}>
              Add
            </Button>
            <CommentDialog isOpen={isOpen} onClose={handleClose} />
          </Card>
          <Card sx={{ width: 500, height: 180, marginTop: 5 ,marginLeft:5}}>
            <form onSubmit={handleAddPost}>
              <TextField id="name" name="name" label="Company name" variant="standard" value={postData.name} onChange={handleInputChange}/>
              <br/>
              <TextField id="field" name="field" label="Industery" variant="standard" value={postData.field} onChange={handleInputChange}/>
              <br/>
              <Button type='submit' variant="outlined" color="primary" style={{ float: 'right', marginRight: 10 }}>
                Add
              </Button>
            </form>
          </Card>
        </Box>
      </Box>
      <Box display="flex" alignItems="left" alignContent="left"></Box>
        {<PostContext.Provider value={posts[currentIndex]}>
            <CommentList></CommentList>
        </PostContext.Provider>}
    </Box>
    ) : (<p>No date</p>)
  );
};

export default CardNav;