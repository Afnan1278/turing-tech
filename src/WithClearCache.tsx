import React, {useEffect } from "react";
import packageJson from "../package.json";
import moment from "moment";

const buildDateGreaterThan = (latestDate:any, currentDate:any) => {
  const momLatestDateTime = moment(latestDate);
  const momCurrentDateTime = moment(currentDate);

  if (momLatestDateTime.isAfter(momCurrentDateTime)) {
    return true;
  } else {
    return false;
  }
};

const WithClearCache =()=> {


  const refreshCacheAndReload = () => {
    
    if (caches) {
      
      // Service worker cache should be cleared with caches.delete()
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
          
        }
      });
    }
    // delete browser cache and hard reload
    window.location.reload();
  };

  useEffect(() => {
    fetch("/meta.json")
      .then((response) => response.json())
      .then((meta) => {
        const latestVersionDate = meta.buildDate;
        const currentVersionDate = packageJson.buildDate;

        const shouldForceRefresh = buildDateGreaterThan(
          latestVersionDate,
          currentVersionDate
        );
        if (shouldForceRefresh) {
       
          refreshCacheAndReload();
        } else {
        }
      });
  }, []);

  return (
    <></>
  );
}

export default WithClearCache;