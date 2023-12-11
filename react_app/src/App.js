import React, { useState, useMemo, useRef } from 'react';
import './App.css';
import Slider from './components/Slider';
import SidebarItem from './components/SidebarItem';

const getDefaultOptions = () => [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
];

function App() {

  const [file, setFile] = useState();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(getDefaultOptions());
  const selectedOption = options[selectedOptionIndex];

  const handleSliderChange = ({ target }) => {
    setOptions((prevOptions) =>
      prevOptions.map((option, index) => (index !== selectedOptionIndex ? option : { ...option, value: target.value }))
    );
  };

  const handleImageChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const getImageStyle = useMemo(() => {
    const filters = options.map((option) => `${option.property}(${option.value}${option.unit})`);
return { filter: filters.join(' ') };

  }, [options]);

 

  return (
    <div className='container'>
      <div className='main-image'>
        <h1 class='title'>IMAGE EDITOR</h1>
        <h3 class='image-add'>Upload your Image:</h3>
        <input  type='file' onChange={handleImageChange} />
        <img src={file} alt='SELECTED IMAGE' style={getImageStyle} class='image'/>
      
        
      </div>
      
      
      <div className='sidebar'>
        {options.map((option, index) => (
          <SidebarItem
            key={index}
            name={option.name}
            active={index === selectedOptionIndex}
            handleClick={() => setSelectedOptionIndex(index)}
          />
        ))}
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
  
    </div>
  );
}

export default App;