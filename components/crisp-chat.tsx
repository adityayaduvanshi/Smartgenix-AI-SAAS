'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('6149a535-3e16-429f-89c4-8f47566d3366');
  }, []);

  return null;
};
