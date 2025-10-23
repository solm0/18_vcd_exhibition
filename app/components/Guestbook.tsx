'use client'

import { auth, database } from '../lib/firebase';
import { ref, set, get } from 'firebase/database';
import { signInAnonymously } from 'firebase/auth';
import { useEffect, useState } from 'react';

interface Message {
  timestamp: string;
  message: string;
}

export default function Guestbook() {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [messages, setMessages] = useState<{ timestamp: string; message: string }[]>([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const now = new Date();
    const formatted = `${now.getFullYear().toString().slice(2)}.${now.getMonth() + 1}.${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    try {
      await signInAnonymously(auth);
      const guestbookRef = ref(database, 'guestbooks/' + Date.now());
      await set(guestbookRef, { message: input, timestamp: formatted});
      setInput('');
      setReloadFlag((prev) => !prev);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const getMessages = async () => {
    try {
      const snapshot = await get(ref(database, 'guestbooks'));
      return snapshot.val();
    } catch (error) {
      console.error("Error during retrieval:", error);
    }
  }

  useEffect(() => {
    const fetchMessages = async () => {
      const data: Message = await getMessages();
      setMessages(data ? Object.values(data).reverse() : []);
    };
    fetchMessages();
  }, [reloadFlag]);

  return (
    <div className='w-96 h-auto flex flex-col gap-4'>

      <p>방명록!!</p>

      {/* 목록 */}
      <div className='h-52 overflow-y-scroll'>
        {messages.map((msg, idx) => (
          <div key={idx} className="flex gap-2">
            <p className='w-28 shrink-0'>{msg.timestamp}</p>
            —
            <p className="font-bold">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* 인풋창 */}
      <div className='flex gap-4 items-start w-full h-12'>
        <textarea
          className='flex-6 focus:outline-0 focus:border h-full'
          value={input}
          wrap="soft"
          onChange={(e) => setInput(e.target.value)}
          placeholder='감상평이나 피드백을 적어주세요!'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isComposing) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          onCompositionStart={() => setIsComposing(true)} // Track IME composition start
          onCompositionEnd={() => setIsComposing(false)} // Track IME composition end
        />
        <button
          onClick={handleSubmit}
          className='border px-2 py-1 flex-1 hover:opacity-50'
        >
          전송
        </button>
      </div>
    </div>
  )
}