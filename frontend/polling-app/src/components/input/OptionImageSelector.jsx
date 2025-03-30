import React from "react";
import { HiOutlineTrash, HiMiniPlus } from "react-icons/hi2";

const OptionImageSelector = ({ imageList, setImageList }) => {
  // Handle adding an image
  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file && imageList.length < 4) {
      const reader = new FileReader();
      reader.onload = () => {
        // Add object with base64 and file to the array
        setImageList([...imageList, { base64: reader.result, file }]);
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  // Handle deleting an image
  const handleDeleteImage = (index) => {
    const updatedImages = imageList.filter((_, i) => i !== index);
    setImageList(updatedImages);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {imageList.map((item, index) => (
          <div key={index} className="bg-gray-600/10 rounded-md relative">
            <img
              src={item.base64}
              alt={`Uploaded ${index}`}
              className="w-full h-36 object-contain rounded-md"
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="text-red-500 bg-gray-100 rounded-full p-2 absolute top-2 right-2"
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          </div>
        ))}
      </div>

      {imageList.length < 4 && (
        <div className="flex items-center gap-5">
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleAddImage}
            className="hidden"
            id="imageInput"
          />
          <label
            htmlFor="imageInput"
            className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <HiMiniPlus className="text-lg" />
            Select Image
          </label>
        </div>
      )}
    </div>
  );
};

export default OptionImageSelector;
