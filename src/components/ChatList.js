import { useParams, Link } from 'react-router-dom';
import { Dialog, List, ListItem, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat } from '../store/chats/actions';
import { Delete } from '@mui/icons-material';

const ChatList = () => {
  const [visible, setVisible] = useState(false);
  const [chatName, setChatName] = useState('');
  const chats = useSelector(state => state.chats.chatList);

  const { chatId } = useParams();
  const dispatch = useDispatch();

  const handleOpen = () => setVisible(true);

  const handleChange = (event) => setChatName(event.target.value);

  const onAddChat = () => {
    dispatch(addChat(chatName));
    setChatName('');
    setVisible(false);
  };

  const removeChat = (index) => {
    dispatch(deleteChat(index));
  };

  return (
    <div className='chatListNice'>
      <label style={{ background: 'rgb(61 58 58)', display: 'block', padding: '10px' }}>Чаты:</label>
      <div className='chatAndAdd'>
        <List>
          {chats?.length > 0 ? chats?.map((chat, index) => (
            <ListItem key={index} style={{ borderBottom: '1px solid #ccc' }}>
              <Link to={`/chats/${chat.id}`}>
                <div className='chatNameAndDel'>
                  <b style={{ color: chat.id === chatId ? '#ccc' : 'grey' }}>
                    {chat.name}
                  </b>
                  <button onClick={() => removeChat(index)}><Delete /></button>
                </div>

              </Link>
            </ListItem>
          )) : <div>Чатов нет</div>}
        </List>
        <Button variant='outlined' onClick={handleOpen} size='large'>Добавить чат</Button>
      </div>

      <Dialog open={visible} onClose={() => setVisible(false)}>
        <TextField value={chatName} onChange={handleChange} />
        <Button onClick={onAddChat}>Submit</Button>
      </Dialog>
    </div>
  );
};

export default ChatList;


