"use client";

import exifr from "exifr";
import { useState } from "react";

export default function Home() {
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState(null);
  const [size, setSize] = useState(null);
  const [type, setType] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [date, setDate] = useState(null);

  const imageProcess = async (selectedFile) => {
    const { name, size, type } = selectedFile;
    // Resmi önizlemek için bir veri URI oluştur
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    const imageExifData = await exifr.parse(selectedFile);
    const { longitude, latitude, DateTimeOriginal } = imageExifData;

    setName(name);
    setSize(size);
    setType(type);
    setLatitude(latitude);
    setLongitude(longitude);
    setDate(DateTimeOriginal.toGMTString());
  };

  const handleInput = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      imageProcess(selectedFile);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile) {
      console.log("Dropped file:", droppedFile);
      imageProcess(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Sürüklenen dosyanın bırakılabileceği bölge üzerindeyken stil veya başka işlemler yapabilirsiniz.
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Sürüklenen dosyanın bırakılabileceği bölgeye giriş yapıldığında stil veya başka işlemler yapabilirsiniz.
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Sürüklenen dosyanın bırakılabileceği bölgeden çıkıldığında stil veya başka işlemler yapabilirsiniz.
  };

  const resetAllStates = () => {
    setPreviewImage(null);
    setName(null);
    setSize(null);
    setType(null);
    setLongitude(null);
    setLatitude(null);
    setDate(null);
  };

  return (
    <main className="min-h-screen bg-sky-900">
      <div
        className="flex items-center justify-center max-w-2xl mx-auto pt-10"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG or JPEG
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleInput}
          />
        </label>
      </div>
      <div className="flex flex-col items-center justify-between p-8">
        {previewImage && (
          <div className="mb-4 w-full items-center">
            <div className="flex justify-between mx-auto">
              <p className="font-semibold">Selected Image Preview</p>
              <button className="italic underline" onClick={resetAllStates}>
                Reset
              </button>
            </div>
            <table className="w-full mt-5">
              <tbody>
                <tr>
                  <th className="float-left underline">Image:</th>
                  <td className="mb-10">
                    <img
                      src={previewImage}
                      alt="Selected"
                      className="w-20 h-auto rounded-lg object-center object-cover"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="float-left underline">Name:</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th className="float-left underline">Size:</th>
                  <td>{size} bytes</td>
                </tr>
                <tr>
                  <th className="float-left underline">Type:</th>
                  <td>{type}</td>
                </tr>
                <tr>
                  <th className="float-left underline">Date:</th>
                  <td>
                    <p>{date}</p>
                  </td>
                </tr>
                <tr>
                  <th className="float-left underline">Coordinates:</th>
                  <td>
                    <p>Longitude: {longitude}</p>
                    <p>Latidute: {latitude}</p>
                  </td>
                </tr>
                <tr>
                  <th className="float-left underline">On the Map:</th>
                  <td>
                    <a
                      href={
                        "https://www.google.com/maps/dir//" +
                        latitude +
                        "," +
                        longitude +
                        "/@" +
                        latitude +
                        "," +
                        longitude +
                        ",13z/data=!4m2!4m1!3e0?entry=ttu"
                      }
                      target="_blank"
                    >
                      Go!
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
