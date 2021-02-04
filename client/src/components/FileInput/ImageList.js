import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {BsTrash} from "react-icons/bs"


import "./adding.css";
// import Column from "./Column"

const type = "Image"; // Need to pass which type element can be draggable

const Image = ({ image, index, moveImage }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Move the content
      moveImage(dragIndex, hoverIndex);
      // Update the index for dragged item directly to avoid flickering when half dragged
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type, id: image.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="file-item"
      direction="horizontal"
    >

      <img
        alt={`img - ${image.id}`}
        src={image.src}
        className="file-img"

      />
    </div>
  );
};

const Delete = ({ image, index, moveImage, removeItem }) => {
  const newRef = useRef();

  const setRemove = (e) => {
    removeItem(index);
  };

  return (
    <>
      <div
      className="remove-me-button"
        id={image.id}
        onClick={setRemove}
        value={image.id}
        ref={newRef}
        removeItem={removeItem}
      >
        {" "}
        <BsTrash/>
        <Image
          image={image}
          index={index}
          key={image.src}
          moveImage={moveImage}
          removeItem={removeItem}
        />
      </div>
    </>
  );
};

const ImageList = ({ images, moveImage, removeItem }) => {
  const renderImage = (image, index) => {
    return (
      <div key={image.id}>
        <Delete
          image={image}
          index={index}
          key={image.src}
          moveImage={moveImage}
          removeItem={removeItem}
        />
      </div>
    );
  };

  return <section className="file-list">{images.map(renderImage)}</section>;
};

export default ImageList;
