import React, { useEffect, useState } from "react";
import AdindaImage from "../../assets/imageProfil/Adinda.svg";
import BgTextureCard1 from "../../assets/bg-textureCard1.svg";
import { motion } from "framer-motion";
import SendIcon from "../../assets/sendIcon.svg";
import axios from "axios";

const SEND_MESSAGE_URL = 'https://backend.talentdna.me/api/bot/send';
const HISTORY_URL = '/chat/fetch_history';
const CLEAR_HISTORY_URL = '/chat/clear_history';

export default function AdindaSection() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      window.location.href = '/LoginPage';
    }
  }, []);

  const fetchHistory = async () => {
    if (!user || !user.session_id) return;
    try {
      setLoading(true);
      const response = await axios.post(HISTORY_URL, {
        session_id: user.session_id
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.results) {
        setMessages(response.data.results);
      } else if (response.data && response.data.data) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      if (error.response && error.response.data) {
        console.log('History error detail:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    try {
      setLoading(true);

      const response = await axios.post(SEND_MESSAGE_URL, {
        messages: message,
        session_id: user.session_id,
        id_corporate: user.id_corporate
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setMessage('');
      await fetchHistory();
      setShowChatModal(true);
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.response && error.response.data) {
        console.log('Server response error:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearChatHistory = async () => {
    if (!user || !user.session_id) return;
    try {
      setLoading(true);
      await axios.post(CLEAR_HISTORY_URL, {
        session_id: user.session_id
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await fetchHistory();
    } catch (error) {
      console.error('Error clearing history:', error);
      if (error.response && error.response.data) {
        console.log('Clear history error detail:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showChatModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [showChatModal]);

  return (
    <div>
      <div className="w-full">
        <div className="relative w-full lg:w-[100%] h-[320px]">
          <div className="flex flex-col items-center justify-start px-8 py-6 text-white shadow-md rounded-xl h-[85%]"
            style={{
              background: `linear-gradient(to right, #536CE3, #001FB2)`,
              position: 'relative',
            }}>
            <div
              style={{
                backgroundImage: `url(${BgTextureCard1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.12,
                zIndex: 1, 
              }}
            ></div>

            <div className="z-10 flex items-center justify-between w-full">
              <div className="flex flex-col w-full lg:w-[60%]">
                <h2 className="mb-2 text-3xl font-bold">Hi! I'm Adinda</h2>
                <p className="mb-4 text-sm">
                  Your dedicated Talent DNA chatbot, here to answer all your
                  questions and guide you through the hiring process.
                </p>
              </div>
              
              <div className="w-[200px] h-[200px] overflow-hidden">
                <img
                  src={AdindaImage}
                  alt="Adinda"
                  className="object-contain w-full h-full"
                  style={{clipPath: 'inset(1px 0 0 0)'}}
                />
              </div>
            </div>
          </div>
              
          <div className="absolute bottom-0 w-[90%] p-4 transform -translate-x-1/2 left-1/2 bg-white rounded-xl shadow-md z-20">
            <div className="relative w-full">
              <div className="mb-2 text-sm text-gray-500">
                <p>Have a question? Ask Adinda about Talent DNA!</p>
              </div>
              <div className="relative flex items-center justify-between border border-gray-300 rounded-[20px] shadow-md ">
              <div 
                className="w-[45px] h-[45px] flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setShowChatModal(true);
                  fetchHistory(); 
                }}
              >
                  <img 
                    src="https://img.icons8.com/?size=100&id=16139&format=png&color=3477C9"
                    alt=""
                    className="h-7 w-7"
                   />
                </div>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  placeholder="Type your question here..."
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className="p-2"
                  onClick={sendMessage}
                  disabled={loading}
                >
                  <img src={SendIcon} alt="send" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showChatModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowChatModal(false)}
        >
          <div 
            className="relative w-full max-w-lg p-4 mx-6 bg-white rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button di pojok kanan atas */}
            <button 
              className="absolute top-2 right-2"
              onClick={() => setShowChatModal(false)}
            >
              <img 
                src="https://img.icons8.com/?size=100&id=11997&format=png&color=000000" 
                alt="close" 
                className="w-5 h-5"
              />
            </button>

            <h3 className="mb-2 text-lg font-semibold">Chat with Adinda</h3>
            {loading && <div>Loading...</div>}
            <div className="h-64 p-2 space-y-4 overflow-auto border border-gray-200 rounded-md">
              {messages.map((msg, index) => {
                const isAI = msg.role === 'ai';
                return (
                  <div
                    key={index}
                    className={`flex ${isAI ? 'justify-start' : 'justify-end'} items-start`}
                  >
                    {isAI && (
                      <img
                        src={AdindaImage}
                        alt="Adinda"
                        className="w-8 h-8 mr-2 rounded-full"
                      />
                    )}
                    <div
                      className={`px-4 py-2 rounded-lg ${isAI ? 'bg-gray-100 text-black' : 'bg-blue-100 text-black'}`}
                      style={{ maxWidth: '80%' }}
                    >
                      <p className="py-1 text-sm font-normal">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              {/* Button Clear History di sebelah kiri input */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                className="p-1 border border-black rounded-full"
                onClick={clearChatHistory}
                disabled={loading}
              >
                <img 
                  src="https://img.icons8.com/?size=100&id=59872&format=png&color=#1D4ED8" 
                  alt="clear history" 
                  className="w-5 h-5"
                />
              </motion.button>

              <div className="relative flex items-center justify-between border border-gray-300 rounded-[20px] shadow-md flex-grow">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  placeholder="Type your question here..."
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className="p-2"
                  onClick={sendMessage}
                  disabled={loading}
                >
                  <img src={SendIcon} alt="send" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
