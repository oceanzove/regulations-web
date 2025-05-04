import { type FC, memo } from "react";

import { TEXT_EDITOR_INLINE_STYLES } from "../configuration.tsx";
import { FormatButton } from "../format-button";
import styles from './inline-style-control.module.scss';
import type {EditorState} from "draft-js";

interface IInlineStyleControlProps {
  editorState: EditorState;
  onToggle: (value: string) => void;
}


const InlineStyleControlComponent: FC<IInlineStyleControlProps> = (props: IInlineStyleControlProps) => {
  const { editorState, onToggle } = props;

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className={styles.inlineStyleControl}>
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

InlineStyleControlComponent.displayName = "InlineStyleControl";

export const InlineStyleControl = memo(InlineStyleControlComponent);
