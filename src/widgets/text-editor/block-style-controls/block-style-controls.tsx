import { type FC, memo } from "react";
import styles from './block-style-controls.module.scss'
import { TEXT_EDITOR_BLOCK_TYPES } from "../configuration.tsx";
import { FormatButton } from "../format-button";
import type {EditorState} from "draft-js";

interface IBlockStyleControlsProps {
  editorState: EditorState;
  onToggle: (value: string) => void;
}

const BlockStyleControlsComponent: FC<IBlockStyleControlsProps> = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles.blockStyleControls}>
      {TEXT_EDITOR_BLOCK_TYPES.map((type) => (
        <FormatButton
          key={type.label}
          isActive={type.style === blockType}
          onToggle={onToggle}
          size={type.size}
          style={type.style}
          typeIcon={type.icon}
        />
      ))}
    </div>
  );
};

BlockStyleControlsComponent.displayName = "BlockStyleControls";

export const BlockStyleControls = memo(BlockStyleControlsComponent);
