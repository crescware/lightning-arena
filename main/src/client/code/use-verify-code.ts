import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useCode } from './use-code';

type Return = Readonly<{
  isVerified: boolean;
}>;

export function useVerifyCode(ip: string): Return {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const code = useCode();
  const router = useRouter();

  useEffect(() => {
    (async (): Promise<void> => {
      const res = await fetch(`http://${ip}:3001/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        setIsVerified(false);
        return;
      }

      setIsVerified(true);
    })().catch((e) => {
      throw e;
    });
  }, [ip, code, router]);

  return useMemo(() => ({ isVerified }), [isVerified]);
}
