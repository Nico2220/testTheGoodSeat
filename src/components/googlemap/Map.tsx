import React, { Component } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { mapStyle } from "./mapStyle";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { v4 as uuidv4 } from "uuid";
import { Search } from "./Search";
import { Table } from "../Table";
import { axiosInstance } from "../../config/";
import { Spinner } from "../Spinner";
import { Offers } from "../../types/offers";
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 48.8566969,
  lng: 2.3514616,
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries: Libraries = ["places"];

interface IMarker {
  lat: number;
  lng: number;
}

export function Map() {
  const [markers, setMarkers] = React.useState<IMarker[]>([]);
  const [response, setResponse] = React.useState(null);
  const [clickFindRoute, setClickFindRoute] = React.useState(false);
  const [clickFindRouteForm, setClickFindRouteForm] = React.useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBhBABtU1Bt77Y4pw6KgwokTRqg61Eelf4",
    libraries,
  });

  const [offers, setOffers] = React.useState<Offers[] | []>([]);
  const [isTableLoading, setIsTableLoading] = React.useState(false);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current: IMarker[]) => {
      if (current.length === 2) {
        // removeMaker();
        // return [];
        current = [];
      }
      return [...current, { lat: e.latLng.lat(), lng: e.latLng.lng() }];
    });
    setClickFindRoute(false);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const directionCallBack = (response: any) => {
    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      } else {
        console.log(response);
      }
    }
  };

  const getOffers = async () => {
    setIsTableLoading(true);
    const [marker1, marker2] = markers;
    console.log("1=", marker1, marker1);

    const routeInfo = {
      startLatitude: marker1.lat,
      startLongitude: marker1.lng,
      endLatitude: marker2.lat,
      endLongitude: marker2.lat,
    };

    const stringRouteInfo = JSON.stringify(routeInfo);

    try {
      const response = await axiosInstance.post("/offers", stringRouteInfo);
      if (response.data.statusCode === 200) {
        setOffers(response.data.body);
        setIsTableLoading(false);
      }
    } catch (error) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    setClickFindRouteForm(true);
    e.preventDefault();
    getOffers();
  };

  // React.useEffect(() => {
  //   if (markers.length === 2) {
  //     getOffers();
  //   }
  // }, [markers]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <Spinner data-test="spinner" />;

  return (
    <div className="search_map" data-test="">
      <div className="searchBox">
        <div className="logo">
          <img
            src="https://thegoodseat.fr/wp-content/uploads/2020/09/Logo_horonzital_black_edition_2-1.png"
            alt="thegoodseatlogo"
          />
          {/* <div className="line"></div> */}
        </div>
        <h3 className="title_route">Select A Route</h3>
        <div className="box">
          {/* <div className="line"></div> */}
          <form onSubmit={handleSubmit}>
            <div className="start">Start</div>
            <Search
              markers={markers}
              setMarkers={setMarkers}
              setClickFindRoute={setClickFindRoute}
            />
            <div className="start">End</div>
            <Search
              markers={markers}
              setMarkers={setMarkers}
              setClickFindRoute={setClickFindRoute}
            />
            <button className="btn btn-primary btn-large" type="submit">
              Find Route
            </button>
          </form>
        </div>

        <Table offers={offers} isTableLoading={isTableLoading} />
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.length &&
          markers.map((marker) => (
            <Marker
              key={uuidv4()}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}

        {markers.length === 2 && (
          <DirectionsService
            options={{
              destination: markers[1],
              origin: markers[0],
              travelMode: "DRIVING",
            }}
            callback={directionCallBack}
          />
        )}

        {response !== null && markers.length === 2 && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}
      </GoogleMap>
      <button
        onClick={() => {
          setClickFindRoute(true);
          getOffers();
        }}
        className="btn btn-primary find-route"
        style={{
          display:
            markers.length === 2 && clickFindRoute === false ? "" : "none",
        }}
      >
        Find route
      </button>
    </div>
  );
}

export default Map;
