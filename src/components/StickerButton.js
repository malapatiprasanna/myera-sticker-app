import React from 'react';

const StickerButton = ({ imageSrc, onClick }) => {
  return (
    <button className="sticker-button" onClick={onClick}>
      <img src={imageSrc} alt="sticker" width={50} height={50} />
    </button>
  );
};

export default StickerButton;
