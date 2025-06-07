import React from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const Canvas = ({ stickers, onDragEnd, onDblClick, stageRef }) => {
  return (
    <Stage width={600} height={400} ref={stageRef} className="canvas">
      <Layer>
        {stickers.map((sticker) => (
          <StickerImage
            key={sticker.id}
            sticker={sticker}
            onDragEnd={onDragEnd}
            onDblClick={onDblClick}
          />
        ))}
      </Layer>
    </Stage>
  );
};

const StickerImage = ({ sticker, onDragEnd, onDblClick }) => {
  const [image] = useImage(sticker.imageSrc);

  const handleDragEnd = (e) => {
    const x = e.target.x();
    const y = e.target.y();
    onDragEnd(sticker.id, x, y);
  };

  const handleDblClick = () => {
    onDblClick(sticker.id);
  };

  return (
    <KonvaImage
      image={image}
      x={sticker.x}
      y={sticker.y}
      draggable
      onDragEnd={handleDragEnd}
      onDblClick={handleDblClick}
    />
  );
};

export default Canvas;
