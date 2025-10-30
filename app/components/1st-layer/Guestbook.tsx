'use client'

import { auth, database } from '@/app/lib/firebase';
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
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* 작은화면 열기버튼 */}
      {!isOpen &&
        <button
          className='fixed -top-50 -left-20 flex lg:hidden hover:opacity-50 w-auto h-auto pointer-events-auto px-2 border'
          onClick={() => setIsOpen(true)}
        >
          방명록
        </button>
      }

      <div className={`
        lg:flex w-80 h-auto flex-col gap-4 pointer-events-auto items-start
        ${isOpen ? 'flex': 'hidden'}
      `}>

        {/* 작은화면 제목 겸 닫기버튼 */}
        <button
          className='hover:opacity-50 w-auto h-auto px-2 border block lg:hidden'
          onClick={() => setIsOpen(false)}
        >
          방명록 닫기
        </button>

        {/* 큰화면 제목 */}
        <p className='hidden lg:block'>방명록</p>

        {/* 목록 */}
        <div className='h-50 overflow-y-scroll'>
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
            className='border flex-1 hover:opacity-50'
          >
            전송
          </button>
        </div>
      </div>
    </>
  )
}