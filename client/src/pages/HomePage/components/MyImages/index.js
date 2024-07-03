import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyImages = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedid, setselectedid] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleDeleteImage = (id) => {
    axios.post('http://localhost:9999/user/delImg', {_id:id}).then((res) => {
      alert(res.data.msg);      
      getAll();      
    });
  };

  const handleUpdateModal = (_id) => {
    setselectedid(_id)
    handleShow();
    // Add your update image logic here
  };

  const handleudateimage =()=>{
    var formData = new FormData();
    formData.append('imgUp', selectedImage);
    formData.append('_id',selectedid)
    axios.post('http://localhost:9999/user/upImg', formData).then((res) => {
      alert(res.data.msg);
      handleClose();
      getAll();      
    });
  }

  const handleUpload = () => {
    var formData = new FormData();
    formData.append('imgfile', selectedImage);
    axios.post('http://localhost:9999/user/uploadImg', formData).then((res) => {
      alert(res.data.msg);
      getAll();
      setSelectedImage(null);
    });
  };

  const getAll = () => {
    axios.get('http://localhost:9999/user/getAllImg').then((resdata) => {
      setImages(resdata.data.data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">My Images</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="imageInput">
            Upload an image:
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpload}
            className="bg-primary text-white py-2 px-4 rounded w-full hover:bg-primary transition duration-300"
          >
            Upload Image
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Uploaded Images</h2>
          {images.length === 0 && <p className="text-gray-500">No images uploaded yet.</p>}
          <ul>
            {images.map((image, i) => (
              <li key={i} className="flex items-center justify-between mb-2 p-2 border border-gray-300 rounded">
                <div className="flex items-center">
                  <img src={image.image_url} alt={image.image_name} className="w-16 h-16 object-cover mr-4" />
                  <span>{image.name}</span>
                </div>
                <button
                  onClick={() => handleUpdateModal(image._id)}
                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteImage(image._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Update Image
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Update your selected image here.</p>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleudateimage}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyImages;
