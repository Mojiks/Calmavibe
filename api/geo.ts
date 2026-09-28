export default {
  fetch(request: Request) {
    const headers = request.headers;

    const country = headers.get("x-vercel-ip-country");
    const region = headers.get("x-vercel-ip-country-region");
    const city = headers.get("x-vercel-ip-city");
    const latitude = headers.get("x-vercel-ip-latitude");
    const longitude = headers.get("x-vercel-ip-longitude");

    return Response.json(
      {
        country: country?.toUpperCase() || null,
        region: region || null,
        city: city ? decodeURIComponent(city) : null,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
        },
      },
    );
  },
};
