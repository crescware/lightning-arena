'use client';

import { QRCodeSVG } from 'qrcode.react';
import {
  FormEvent,
  FormEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CreateArenaForm } from './create-arena-form';

type Props = Readonly<{
  ip: string;
}>;

export function Sandbox({ ip }: Props): ReactElement {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');
  const wsRef = useRef<WebSocket>(new WebSocket(`ws://${ip}:7777`));

  useEffect(() => {
    const socket = wsRef.current;

    socket.addEventListener('message', (ev) => {
      if (typeof ev.data === 'string') {
        setMessage(ev.data);
        return;
      }
    });

    return () => socket.close();
  }, []);

  const handleSubmit: FormEventHandler = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      wsRef.current?.send(input);
    },
    [input],
  );

  const codeText = `http://${ip}:3000`;

  return (
    <div>
      <CreateArenaForm ip={ip} />
      <QRCodeSVG includeMargin={true} value={codeText} />

      <h1>{JSON.stringify(message)}</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="text-zinc-800"
          value={input}
          onChange={(e): void => setInput(e.target.value)}
        />
        <button>送信</button>
      </form>
    </div>
  );
}