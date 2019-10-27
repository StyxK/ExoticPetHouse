import React,{useState,useEffect} from 'react'
import { GoogleMap,withGoogleMap,withScriptjs,Marker } from 'react-google-maps'

export const StoreMap = withScriptjs(withGoogleMap((props) => {

    const [mapProps,setMapProps] = useState({zoom:8,coordinate:{ lat:13.736717,lng:100.523186 }})

    useEffect(()=>{
        if(props.selectedStore){
            setMapProps({zoom:9,coordinate:{lat:props.selectedStore.address.latitude,lng:props.selectedStore.address.longitude}})
        }
    },[props.selectedStore])

    const markDown = () => {
        let list = []
        props.stores.map(data=>{
            list.push(
                <Marker key={data.id} position={{ lat: data.address.latitude, lng: data.address.longitude }} />
            )
        })
        return list
    }

    return(
        <GoogleMap zoom={mapProps.zoom} center={mapProps.coordinate}>
            {markDown()}
        </GoogleMap>
    )
}))