export function getVehicleCoverImage(vehicle: any): string {
  if (!vehicle) return "/hero-bg-v2.png";

  if (vehicle.photos && Array.isArray(vehicle.photos) && vehicle.photos.length > 0) {
    // Legacy support for string arrays
    if (typeof vehicle.photos[0] === 'string') {
      return vehicle.photos[0];
    }
    
    // New object structure support
    const visiblePhotos = vehicle.photos.filter((p: any) => p.showOnWeb !== 0);
    const coverPhoto = visiblePhotos.find((p: any) => p.isCoverPhoto === 1);
    
    if (coverPhoto && coverPhoto.url) return coverPhoto.url;
    if (visiblePhotos.length > 0 && visiblePhotos[0].url) return visiblePhotos[0].url;
  }
  
  return vehicle.imageUrl || "/hero-bg-v2.png";
}

export function getVisibleVehicleImages(vehicle: any): string[] {
  if (!vehicle) return ["/hero-bg-v2.png"];

  if (vehicle.photos && Array.isArray(vehicle.photos) && vehicle.photos.length > 0) {
    // Legacy support for string arrays
    if (typeof vehicle.photos[0] === 'string') {
      return vehicle.photos;
    }
    
    // New object structure support
    const visiblePhotos = vehicle.photos
      .filter((p: any) => p.showOnWeb !== 0)
      .map((p: any) => p.url)
      .filter(Boolean); // remove empty/undefined URLs
      
    if (visiblePhotos.length > 0) return visiblePhotos;
  }
  
  return vehicle.imageUrl ? [vehicle.imageUrl] : ["/hero-bg-v2.png"];
}
