
import { useContext }from 'react'
import Rate from '@mui/material/Rating';
import { PostContext } from './cardNav';
import { Divider, Typography } from '@mui/material';

function CommentList() {
  const post=useContext(PostContext);
  return (
        <ul style={{ maxHeight: '500px', overflow: 'auto' ,listStyle: 'none' }}>
          {
            post.comments ? (
            post.comments.map((comment,index) => (
              <li key={index}>
                <Typography variant="h5" component="div">
                  Job description:{comment.title} Date :{comment.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {comment.case}
                </Typography>
                <Rate disabled={true} value={comment.rate} defaultValue={2.5} precision={0.5}></Rate>
                <Divider />
              </li>
            ))
            ) : (<p>No comments</p>)
          }
        </ul>
  )
}

export default CommentList