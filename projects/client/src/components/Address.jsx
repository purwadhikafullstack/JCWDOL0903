import React from 'react';

const Address = () => {
  return (
    <div className="mt-4 p-4 border border-red-500 bg-white flex justify-center items-center w-3/4 rounded-lg drop-shadow-md">
      <div className="grid grid-cols-2 w-full">
        <div>
          <h1 className="mb-3">
            <span className="text-xl font-semibold border-b-2">Alamat</span> 
          </h1>
          <p>Kota: <span>Jakarta</span></p>
          <p>Provinsi: <span>DKI Jakarta</span></p>
          <p>Kecamatan: <span>Penjaringan</span></p>
          <p>Kode Pos: <span>14440</span></p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button className="bg-red-500 h-1/4 w-20 rounded-full">Button</button>
        </div>
      </div>
    </div>
  );
};

export default Address;
