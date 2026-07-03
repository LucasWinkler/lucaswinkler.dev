import { initHeaderMenu } from '@/components/common/header/header-menu';
import { initHeaderSync } from '@/components/common/header/header-sync';
import { initNavSync } from '@/components/common/header/nav-sync';
import { initHeroImage } from '@/components/sections/hero/hero-image';
import { initSmoothAnchorScroll } from '@/lib/smooth-anchor-scroll';

let smoothAnchorScrollReady = false;

export function initPageScripts(): void {
  initHeaderSync();
  initHeaderMenu();
  initNavSync();
  initHeroImage();

  if (!smoothAnchorScrollReady) {
    initSmoothAnchorScroll();
    smoothAnchorScrollReady = true;
  }
}
