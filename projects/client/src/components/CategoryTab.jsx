import React from 'react';
import Building from "../assets/buildingMaterial.png"
import Doors from "../assets/doors_windows.png"
import Paint from "../assets/paint.png"
import Plumbing from "../assets/plumbing.png"
const CategoryTab = () => {


  return (
    <div className='border-b-2 py-3'>
      <h1 className='text-center h-20 text-2xl font-medium'>Product Categories</h1>
      {/* List Kategorinya */}
      <div className='flex flex-row'> 
        <div className='w-1/6 mx-auto'>
          <div className='rounded-full overflow-hidden'>
            <img 
              className="object-cover object-center" 
              src={Building}
              alt='Gambar image'
            />
          </div>
          <div className='text-center my-3 font-medium'>
            Building Material
          </div> 
        </div>

        <a className='w-1/6 mx-auto' href="">
          <div className='rounded-full overflow-hidden'>
            <img 
              className="object-cover object-center" 
              src={Doors}
              alt='Gambar image'
            />
          </div>
          <div className='text-center my-3 font-medium'>
            Doors and Windows
          </div> 
        </a>

        <a className='w-1/6 mx-auto' href="">
          <div className='rounded-full overflow-hidden'>
            <img 
              className="object-cover object-center" 
              src={Paint}
              alt='Gambar image'
            />
          </div>
          <div className='text-center my-3 font-medium'>
            Paint and Sundries
          </div> 
        </a>

        <a className='w-1/6 mx-auto' href='http://localhost:3000/products'>
          <div className='rounded-full overflow-hidden'>
            <img 
              className="object-cover object-center" 
              src={Plumbing}
              alt='Gambar image'
            />
          </div>
          <div className='text-center my-3 font-medium'>
            Plumbing
          </div> 
        </a>
      </div>      
      {/* Akhir dari list kategori */}
    </div>
  );
};

export default CategoryTab;
