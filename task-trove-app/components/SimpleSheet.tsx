import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop types validation

import { Sheet } from 'tamagui';

const spModes = ['percent', 'constant', 'fit', 'mixed'] as const;

type SheetDemoProps = {
  open: boolean;
  modal: boolean;
  snapPointsMode: (typeof spModes)[number];
  position: number;
  content: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onModalChange?: (modal: boolean) => void;
  onPositionChange?: (position: number) => void;
};

export const SimpleSheet: React.FC<SheetDemoProps> = ({
  open,
  modal,
  snapPointsMode,
  position,
  content,
}) => {
  return (
    <>
      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        snapPointsMode={snapPointsMode}
        dismissOnSnapToBottom
        position={position}
        zIndex={100_000}
        animation="quick"
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle />
        <Sheet.Frame
          backgroundColor="gray"
          padding="$4"
          justifyContent="center"
          alignItems="center"
          space="$5"
        >
          {content}
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

SimpleSheet.propTypes = {
  open: PropTypes.bool.isRequired,
  modal: PropTypes.bool.isRequired,
  snapPointsMode: PropTypes.oneOf(spModes).isRequired,
  position: PropTypes.number.isRequired,
  content: PropTypes.node.isRequired,
  onOpenChange: PropTypes.func,
  onModalChange: PropTypes.func,
  onPositionChange: PropTypes.func,
};
