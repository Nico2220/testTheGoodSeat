import React from "react";
import { Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxProps,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

interface IMarker {
  lat: number;
  lng: number;
}
interface IProps {
  markers: IMarker[];
  setMarkers: Function;
}

export function Search(props: IProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 48.8566969,
        lng: () => 2.3514616,
      },

      radius: 300 * 1000,
    },
  });

  const handleSelectvalue = (val: string): void => {
    setValue(val, false);

    getGeo(val);
  };

  const getGeo = async (address: string) => {
    try {
      const result = await getGeocode({ address });
      const { lat, lng } = await getLatLng(result[0]);
      props.setMarkers((current: IMarker[]) => {
        if (current.length === 2) {
          current.shift();
        }
        return [...current, { lat, lng }];
      });
      console.log(lat, lng);
    } catch (error) {}
  };

  const renderSuggestions = (): JSX.Element => {
    const suggestions = data.map(({ place_id, description }: any) => (
      <ComboboxOption key={place_id} value={description} />
    ));

    return (
      <>
        {suggestions}
        <li className="logo">
          <img
            src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
            alt="Powered by Google"
          />
        </li>
      </>
    );
  };

  return (
    <Combobox onSelect={handleSelectvalue} aria-labelledby="demo">
      <ComboboxInput
        required
        name="start"
        style={{
          width: "400px",
          height: "80px",
          marginBottom: "40px",
          outline: "none",
          border: "none",
          backgroundColor: "#f5f5f6",
          borderRadius: "5px",
          padding: "10px",
        }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
      />

      <ComboboxPopover>
        <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
