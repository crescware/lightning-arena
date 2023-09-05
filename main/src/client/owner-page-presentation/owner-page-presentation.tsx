'use client';

import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import { ReactElement } from 'react';

import { useVerifyCode } from '../code';
import { ipAtom } from '../ip-atom';
import { Form } from './form';

type Props = Readonly<{
  ip: string;
}>;

export function OwnerPagePresentation({ ip }: Props): ReactElement {
  ipAtom.set(ip);

  const { isVerified } = useVerifyCode(ip);

  const ownerPagePath = `http://${ip}:3000/owner`;

  if (!isVerified) {
    return (
      <div className="flex h-full items-center justify-center">
        <div
          className={clsx(
            'flex flex-col rounded-xl p-10',
            'border border-slate-300 dark:border-slate-900',
            'bg-slate-200 dark:bg-slate-700',
          )}
        >
          <p>管理者コードを入力</p>
          <input type="password" />
          <button>送信</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className={clsx(
          'flex flex-row divide-x divide-slate-500 rounded-xl py-10',
          'border border-slate-300 dark:border-slate-900',
          'bg-slate-200 dark:bg-slate-700',
        )}
      >
        <div className="px-10">
          <Form />
        </div>

        <div className="flex max-w-sm flex-col gap-4 px-10">
          <p className="text-lg font-semibold">管理画面</p>

          <div>
            <p className="text-sm">
              「アリーナを開設」すると、参加者向けの画面が表示されます。
            </p>
            <p className="text-sm">
              別の端末で管理画面を開きたい場合、二次元コードを撮影してください。
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex grow items-center justify-center">
              <div className="rounded-md border-8 border-white bg-white p-2">
                <QRCodeSVG
                  includeMargin={false}
                  size={100}
                  value={ownerPagePath}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center gap-2">
              <p className="text-center text-sm">
                <a className="text-slate-300 underline" href={ownerPagePath}>
                  {ownerPagePath}
                </a>
              </p>
              <button>コピー</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
