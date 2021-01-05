import React, {useState} from "react"

function ImageUpload () {
const [image, setImage] = useState ({ preview: "", raw: ""})

const handleInputChange = e => {
  if (e.target.files.length) {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });
  }
}
const handleUpload = async e => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", image.raw);

  await fetch("/uploads", {
    method: "POST",
    header: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  })
}
  return( 
<>
<label htmlFor="upload-button">
  {image.preview ? (
    <img src={image.preview} alt="test" width="300" height="300"/>

  ) : (
    <>
    <span className="fa-stack fa-2x mt-3 mb-2">
      <i className="fas fa-circle fa-stack-2x" />
      <i className="fas fa-store fa-stack-1x fa-inverse" />
    </span>
    <h5 className="text-center">Upload your photo</h5>
  </>
  )}
</label>
<input
type="file"
id="upload-button"
style={{display: "none"}}
onChange={handleInputChange}
/>

<button onClick={handleUpload}>UPLOAD</button>
</>
  )
}

export default ImageUpload;