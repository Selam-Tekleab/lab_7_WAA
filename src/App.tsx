
import './App.scss';
import avatar from './images/bozai.png';
import { useState } from 'react';


const defaultList = [
  {
    rpid: 3,
    user: { uid: '13258165', avatar: '', uname: 'Jay Zhou' },
    content: 'Nice, well done',
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: { uid: '36080105', avatar: '', uname: 'Song Xu' },
    content: 'I search for you thousands of times, from dawn till dusk',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: { uid: '30009257', avatar: '', uname: 'John' },
    content: 'I told my computer I needed a break... now it will never leave me alone.',
    ctime: '10-19 09:00',
    like: 66,
  },
];


const user = {
  uid: '30009257',
  avatar: '',
  uname: 'John',
};

const App = () => {
  const [comments, setComments] = useState(defaultList);
  const [activeTab, setActiveTab] = useState('hot'); 
  const [newComment, setNewComment] = useState(''); 

  
  const sortComments = (type: 'hot' | 'newest') => {
    let sortedComments = [...comments]; 

    if (type === 'hot') {
      sortedComments = sortedComments.sort((a, b) => b.like - a.like);
    } else if (type === 'newest') {
      sortedComments = sortedComments.sort(
        (a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime()
      );
    }

    setComments(sortedComments); 
    setActiveTab(type); 
  };

  
  const handlePostComment = () => {
    const newCommentObj = {
      rpid: comments.length + 1,
      user: { uid: user.uid, avatar: user.avatar, uname: user.uname },
      content: newComment,
      ctime: new Date().toLocaleDateString(),
      like: 0,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment(''); 
  };

  return (
    <div className="app">
      {}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {}
            <span className="total-reply">{comments.length}</span>
          </li>
          <li className="nav-sort">
            <span
              className={`nav-item ${activeTab === 'hot' ? 'active' : ''}`}
              onClick={() => sortComments('hot')}
            >
              Top
            </span>
            <span
              className={`nav-item ${activeTab === 'newest' ? 'active' : ''}`}
              onClick={() => sortComments('newest')}
            >
              Newest
            </span>
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {}
        <div className="box-normal">
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            <textarea
              className="reply-box-textarea"
              placeholder="Tell something..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="reply-box-send" onClick={handlePostComment}>
              <div className="send-text">Post</div>
            </div>
          </div>
        </div>

        {}
        <div className="reply-list">
          {comments.map((comment) => (
            <div className="reply-item" key={comment.rpid}>
              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    className="bili-avatar-img"
                    src={comment.user.avatar || avatar}
                    alt={comment.user.uname}
                  />
                </div>
              </div>
              <div className="content-wrap">
                <div className="user-info">
                  <div className="user-name">{comment.user.uname}</div>
                </div>
                <div className="root-reply">
                  <span className="reply-content">{comment.content}</span>
                  <div className="reply-info">
                    <span className="reply-time">{comment.ctime}</span>
                    <span className="reply-time">Like: {comment.like}</span>
                    <span className="delete-btn">Delete</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;