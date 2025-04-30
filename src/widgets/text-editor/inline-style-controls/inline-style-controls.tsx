import { type FC, memo } from "react";

import { TEXT_EDITOR_INLINE_STYLES } from "../configuration.tsx";
import { FormatButton } from "../format-button";
import styles from './inline-style-controls.module.scss';
import type {EditorState} from "draft-js";

interface IInlineStyleControlsProps {
  editorState: EditorState;
  onToggle: (value: string) => void;
}


const InlineStyleControlsComponent: FC<IInlineStyleControlsProps> = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className={styles.inlineStyleControls}>
      {TEXT_EDITOR_INLINE_STYLES.map((type) => (
        <FormatButton
          key={type.label}
          isActive={currentStyle.has(type.style)}
          onToggle={onToggle}
          size={type.size}
          style={type.style}
          typeIcon={type.icon}
        />
      ))}
    </div>
  );
};

InlineStyleControlsComponent.displayName = "InlineStyleControls";

export const InlineStyleControls = memo(InlineStyleControlsComponent);
