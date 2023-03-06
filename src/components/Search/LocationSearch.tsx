import { useState, useEffect } from 'react';
import { LoadScriptNext } from '@react-google-maps/api';
import { AutoComplete } from 'antd';
import { debounce } from 'lodash';
import { G_API_KEY } from "@utils/config";

const libraries = ['places' as const, 'drawing' as const]

export default function LocationSearchWrapper(props) {
  return (
    <LoadScriptNext
      googleMapsApiKey={G_API_KEY}
      libraries={libraries}
    >
      <LocationSearch {...props} />
    </LoadScriptNext>
  )
}

const processOptions = (results) => {
  return results.map((result, i) => {
    let text = result.formatted_address
    if (!text) {
      text = `${result.geometry.location.lat()}, ${result.geometry.location.lng()}`
    }
    return ({
      label: text,
      value: text,
      data: {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
        address: text
      },
      key: `${text} - ${i}`
    })
  })
}

const LocationSearch = ({ value, onChange }) => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    console.log(query)
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    if (query) {
      if (query.match(/^-?\d+\.?\d*,\s*-?\d+\.?\d*$/)) {
        console.log('lat,lng')
        const [lat, lng] = query.split(',').map((s) => parseFloat(s));
        setOptions([{
          label: query,
          value: query,
          data: {
            lat,
            lng,
            address: query
          }
        }])
        return;
      }
      service.textSearch({
        query: query
      }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setOptions(processOptions(results));
        }
        console.log(results, status)
      });
    } else {
      setOptions([]);
    }
  }, [query]);

  useEffect(() => {
    if (value) {
      setInput(value.address);
    } else {
      setInput('');
    }
  }, [value])

  const onSelect = (value, option) => {
    console.log('onSelect', value, option);
    onChange(option.data);
  }

  const onSearch = debounce(setQuery, 300);

  return (
    <AutoComplete
      value={input}
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={setInput}
    />
  )
}
