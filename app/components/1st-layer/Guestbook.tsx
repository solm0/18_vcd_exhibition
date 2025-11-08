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
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const now = new Date();
    const formatted = `
      ${now.getFullYear().toString().slice(2)}.${now.getMonth() + 1}.${now.getDate()}, ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}
    `;

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
    <div className={`rotate-[30deg] md:rotate-0 origin-top-left fixed p-2 md:p-0 w-[calc(100vw-1rem)] md:w-80 xl:w-120 ${isOpen ? 'border-b': 'border-0'} border-neutral-200 bg-neutral-500 h-auto -top-78 md:-top-40 xl:-top-20 -left-22 md:-left-40 pointer-events-auto transition-all`}>
      <div className="w-full h-auto flex flex-col gap-4 items-start">

        {/* 열기/닫기 버튼 */}
        <button
          className='hover:opacity-50 w-auto h-auto px-2 border'
          onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}
        >
          <p className='scale-x-95 tracking-normal origin-left'>
            {isOpen ? '방명록 닫기' : '방명록'}
          </p>
        </button>

        <div className={`${isOpen ? 'flex' : 'hidden'} h-auto w-full flex-col gap-4`}>
          {/* 목록 */}
          <div className='w-full h-50 xl:h-70 overflow-y-scroll overflow-x-hidden custom-scrollbar'>
            {messages.map((msg, idx) => (
              <div key={idx} className="relative flex gap-2 w-full min-w-0">
                <p className='w-28 shrink-0 scale-x-95 tracking-normal origin-left opacity-70'>{msg.timestamp}</p>
                <p className="break-keep overflow-hidden min-w-0 scale-x-95 tracking-normal origin-left">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* 인풋창 */}
          <div className='flex items-start w-full h-8'>
            <textarea
              className='flex-6 focus:outline-0 focus:border h-full scale-x-95 tracking-normal origin-left bg-neutral-500'
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
              className='border flex-1 hover:opacity-50 scale-x-95 tracking-normal origin-left'
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}