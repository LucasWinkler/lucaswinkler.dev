export const fadeEaseCss = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const fadeEase = [0.22, 1, 0.36, 1] as const;
export const noMotion = { duration: 0 } as const;

/** Critically damped UI spring — Apple damping 1.0 / response ~0.4s */
export const springUi = { type: 'spring' as const, bounce: 0, duration: 0.4 } as const;

/** Momentum / flick spring — slight overshoot only when the gesture carried velocity */
export const springMomentum = { type: 'spring' as const, bounce: 0.2, duration: 0.4 } as const;

/** Entrance settle — critically damped, slightly longer response */
export const springReveal = { type: 'spring' as const, bounce: 0, duration: 0.7 } as const;

export const revealSectionDuration = 1.05;
export const revealGridDuration = 1.05;
export const revealGridStagger = 0.14;
export const revealItemDuration = 0.88;
export const revealItemStagger = 0.11;

export const revealViewport = {
  once: true,
  amount: 0.25,
  margin: '0px 0px -10% 0px',
} as const;
