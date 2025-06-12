import { type FC, memo } from "react";
import styles from './block-style-control.module.scss'
import { TEXT_EDITOR_BLOCK_TYPES } from "../../configuration.tsx";
import { FormatButton } from "../format-button";
import type {EditorState} from "draft-js";

interface IBlockStyleControlProps {
  editorState: EditorState;
  onToggle: (value: string) => void;
}

const BlockStyleControlComponent: FC<IBlockStyleControlProps> = (props: IBlockStyleControlProps) => {
  const { editorState, onToggle } = props;

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles.blockStyleControl}>
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

BlockStyleControlComponent.displayName = "BlockStyleControl";

export const BlockStyleControl = memo(BlockStyleControlComponent);
