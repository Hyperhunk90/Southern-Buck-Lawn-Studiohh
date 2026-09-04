'use client';

import LightingHero from './LightingHero';
import LightingStory from './LightingStory';
import LightingClose from './LightingClose';
import styles from './lighting.module.css';

export default function LightingNightPage() {
  return (
    <div className={styles.page}>
      <LightingHero />
      <LightingStory />
      <LightingClose />
    </div>
  );
}
