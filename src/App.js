import React, { useState, useRef } from 'react';
import { Stage, Layer, Text } from 'react-konva';

const EMOJIS = [
  { id: 'heart', symbol: '❤️' },
  { id: 'star', symbol: '⭐' },
  { id: 'smiley', symbol: '🙂' },
];

export default function App() {
  const [items, setItems] = useState([]);
  const idCounter = useRef(0);
  const stageRef = useRef(null);

  const snapToGrid = (pos) => Math.round(pos / 40) * 40;

  const addEmoji = (emoji) => {
    setItems((prev) => [
      ...prev,
      {
        id: idCounter.current++,
        symbol: emoji.symbol,
        x: snapToGrid(50),
        y: snapToGrid(50),
      },
    ]);
  };

  const onDragEnd = (id, x, y) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, x: snapToGrid(x), y: snapToGrid(y) } : item
      )
    );
  };

  const onDblClick = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Download canvas as PNG
  const downloadImage = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = 'emoji_canvas.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        {EMOJIS.map((emoji) => (
          <button
            key={emoji.id}
            onClick={() => addEmoji(emoji)}
            style={{ fontSize: 24, marginRight: 10 }}
            title={`Add ${emoji.symbol}`}
          >
            {emoji.symbol}
          </button>
        ))}
        <button
          onClick={downloadImage}
          style={{ marginLeft: 20, fontSize: 18, padding: '6px 12px' }}
        >
          Download
        </button>
      </div>

      <Stage
        width={600}
        height={400}
        style={{ border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
        ref={stageRef}
      >
        <Layer>
          {items.map(({ id, symbol, x, y }) => (
            <Text
              key={id}
              text={symbol}
              x={x}
              y={y}
              fontSize={40}
              draggable
              onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
              onDblClick={() => onDblClick(id)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
