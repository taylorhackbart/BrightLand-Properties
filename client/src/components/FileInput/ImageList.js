import React, { useRef } from "react";
import { useDrag, useDrop} from "react-dnd";
import {BsTrash} from "react-icons/bs"
import "./adding.css";


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
      <img
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
        alt={`img - ${image.id}`}
        src={image.src}
        className="file-img"
      />

  );
};

const Delete = ({ image, index, moveImage, removeItem}) => {
  const newRef = useRef();
  const sourceId = image.id
  const targetId = image.id
  
  const setRemove = () => {
    removeItem(index);
  };

  return (
    <>
      <div
      className="remove-me-button"
        onClick={setRemove}
        value={image.id}
        ref={newRef}
      >
        {" "}
        <BsTrash/>
        <Image
          sourceId={sourceId}
          targetId={targetId}
          image={image}
          index={index}
          key={image.id.toString()}
          value={image.id}
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
          id={image.id}
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
