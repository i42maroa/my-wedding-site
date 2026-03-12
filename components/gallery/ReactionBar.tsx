
import {  PhotoInterface, ReactionKey } from '@/interfaces/gallery.types';
import styles from './ReactionBar.module.css';
import { useState } from 'react';

const EMOJIS: ReactionKey[] = ['❤️', '😂', '😍', '🥳', '🔥'];

interface ReactionBarProps {
  photo: PhotoInterface;
  onToggle: (emoji: ReactionKey) => void;
}

export default function ReactionBar({ photo }: ReactionBarProps) {
  const [items, setItems] = useState<Record<string, number>>(photo.reactionsCount);
 

  const increaseEmoji = (emoji:string) =>{
     setItems(prev => ({
      ...prev,
      [emoji]: prev[emoji] + 1
    }))
  }

  return (
    <div className={styles.reactions}>
      {Object.entries(items).map(([emoji, count]) => {
        return (
          <button
            key={emoji}
            type="button"
            className={`${styles.reaction} `}
            onClick={() => increaseEmoji(emoji)}
          >
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.count}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}