import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ExternalLink,
  Globe2,
  HeartHandshake,
  Hospital,
  LocateFixed,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Layout from "../components/Layout";

type GeoLocation = {
  country: string | null;
  region: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
};

type SupportResource = {
  name: string;
  number: string;
  description: string;
  href: string;
  available?: string;
};

type CountryConfig = {
  emergency: string | null;
  emergencyLabel: string;
  support: SupportResource | null;
};

const FIND_A_HELPLINE = "https://findahelpline.com";

const COUNTRY_CONFIG: Record<string, CountryConfig> = {
  MX: {
    emergency: "911",
    emergencyLabel: "Emergencias",
    support: {
      name: "LÃ­nea de la Vida",
      number: "800 911 2000",
      description:
        "OrientaciÃ³n y apoyo especializado en salud mental y adicciones. Atiende, entre otros temas, ansiedad, depresiÃ³n y crisis emocionales.",
      href: "tel:8009112000",
      available: "24 horas Â· 365 dÃ­as",
    },
  },

  US: {
    emergency: "911",
    emergencyLabel: "Emergencias",
    support: {
      name: "988 Suicide & Crisis Lifeline",
      number: "988",
      description:
        "Apoyo gratuito y confidencial para crisis emocionales y de salud mental.",
      href: "tel:988",
      available: "24 horas Â· 7 dÃ­as",
    },
  },

  CA: {
    emergency: "911",
    emergencyLabel: "Emergencias",
    support: {
      name: "9-8-8 Suicide Crisis Helpline",
      number: "988",
      description:
        "Apoyo para personas que atraviesan una crisis relacionada con el suicidio o estÃ¡n preocupadas por alguien.",
      href: "tel:988",
      available: "24 horas Â· 7 dÃ­as",
    },
  },

  GB: {
    emergency: "999",
    emergencyLabel: "Emergencias Â· tambiÃ©n 112",
    support: {
      name: "Samaritans",
      number: "116 123",
      description:
        "LÃ­nea de apoyo emocional para personas que necesitan hablar con alguien.",
      href: "tel:116123",
      available: "24 horas",
    },
  },

  AU: {
    emergency: "000",
    emergencyLabel: "Emergencias",
    support: {
      name: "Lifeline",
      number: "13 11 14",
      description:
        "Apoyo en crisis y prevenciÃ³n del suicidio por telÃ©fono.",
      href: "tel:131114",
      available: "24 horas Â· 7 dÃ­as",
    },
  },

  NZ: {
    emergency: "111",
    emergencyLabel: "Emergencias",
    support: {
      name: "1737",
      number: "1737",
      description:
        "Apoyo de salud mental y emocional. TambiÃ©n puedes utilizarlo para pedir orientaciÃ³n durante una crisis.",
      href: "tel:1737",
      available: "24 horas",
    },
  },
};

const EU_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
]);

function getCountryName(country: string | null) {
  if (!country) return "tu paÃ­s";

  try {
    const displayNames = new Intl.DisplayNames(["es"], {
      type: "region",
    });

    return displayNames.of(country) || country;
  } catch {
    return country;
  }
}

function getCountryFromLanguage() {
  if (typeof navigator === "undefined") return null;

  const language = navigator.language || "";
  const match = language.match(/[-_]([A-Z]{2})$/i);

  return match?.[1]?.toUpperCase() || null;
}

function getCountryConfig(country: string | null): CountryConfig {
  if (!country) {
    return {
      emergency: null,
      emergencyLabel: "Emergencias locales",
      support: null,
    };
  }

  if (COUNTRY_CONFIG[country]) {
    return COUNTRY_CONFIG[country];
  }

  if (EU_COUNTRIES.has(country)) {
    return {
      emergency: "112",
      emergencyLabel: "Emergencias",
      support: null,
    };
  }

  return {
    emergency: null,
    emergencyLabel: "Emergencias locales",
    support: null,
  };
}

function buildMapEmbedUrl(latitude: number, longitude: number) {
  const deltaLat = 0.018;
  const deltaLon = 0.025;

  const left = longitude - deltaLon;
  const right = longitude + deltaLon;
  const bottom = latitude - deltaLat;
  const top = latitude + deltaLat;

  return (
    "https://www.openstreetmap.org/export/embed.html?" +
    new URLSearchParams({
      bbox: `${left},${bottom},${right},${top}`,
      layer: "mapnik",
      marker: `${latitude},${longitude}`,
    }).toString()
  );
}

function buildHospitalSearchUrl(latitude: number, longitude: number) {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`hospitales cerca de ${latitude},${longitude}`)
  );
}

export default function Ayuda() {
  const [geo, setGeo] = useState<GeoLocation>({
    country: null,
    region: null,
    city: null,
    latitude: null,
    longitude: null,
  });

  const [loadingCountry, setLoadingCountry] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCountry() {
      try {
        const response = await fetch("/api/geo", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Geo endpoint unavailable");
        }

        const data = (await response.json()) as GeoLocation;

        if (active) {
          setGeo(data);
        }
      } catch {
        if (active) {
          setGeo((current) => ({
            ...current,
            country: getCountryFromLanguage(),
          }));
        }
      } finally {
        if (active) {
          setLoadingCountry(false);
        }
      }
    }

    void loadCountry();

    return () => {
      active = false;
    };
  }, []);

  const country = geo.country;
  const countryName = useMemo(
    () => getCountryName(country),
    [country],
  );

  const config = useMemo(
    () => getCountryConfig(country),
    [country],
  );

  const hasCoordinates =
    typeof geo.latitude === "number" &&
    Number.isFinite(geo.latitude) &&
    typeof geo.longitude === "number" &&
    Number.isFinite(geo.longitude);

  const mapUrl = hasCoordinates
    ? buildMapEmbedUrl(geo.latitude as number, geo.longitude as number)
    : null;

  const hospitalUrl = hasCoordinates
    ? buildHospitalSearchUrl(
        geo.latitude as number,
        geo.longitude as number,
      )
    : "https://www.google.com/maps/search/?api=1&query=hospitales";

  function requestPreciseLocation() {
    if (!navigator.geolocation) {
      setLocationError(
        "Este navegador no permite obtener tu ubicaciÃ³n precisa.",
      );
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeo((current) => ({
          ...current,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));

        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            "No se concediÃ³ permiso para usar tu ubicaciÃ³n. Puedes intentarlo nuevamente desde los permisos del navegador.",
          );
        } else if (error.code === error.TIMEOUT) {
          setLocationError(
            "La ubicaciÃ³n tardÃ³ demasiado en responder. IntÃ©ntalo nuevamente.",
          );
        } else {
          setLocationError(
            "No fue posible obtener tu ubicaciÃ³n precisa.",
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      },
    );
  }

  const helplineUrl = country
    ? `${FIND_A_HELPLINE}/countries/${country.toLowerCase()}`
    : FIND_A_HELPLINE;

  return (
    <Layout>
      <div className="min-h-screen w-full px-4 py-8 pb-24 text-white sm:px-6 sm:py-10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07]">
              <HeartHandshake
                size={25}
                strokeWidth={1.7}
                className="text-[#D8E9C3]"
              />
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Apoyo inmediato
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
              Encuentra servicios de emergencia, lÃ­neas de apoyo emocional y
              hospitales cercanos a tu ubicaciÃ³n.
            </p>
          </div>

          <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/55">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-3 py-1.5">
              <Globe2 size={14} />
              {loadingCountry
                ? "Detectando paÃ­s..."
                : `PaÃ­s detectado: ${countryName}`}
            </span>

            {geo.city && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-3 py-1.5">
                <MapPin size={14} />
                {geo.city}
              </span>
            )}
          </div>

          <section className="mb-5 rounded-3xl border border-red-300/15 bg-red-950/35 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)] sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-200">
                <AlertTriangle size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Si existe peligro inmediato
                </h2>
                <p className="mt-1 text-sm leading-5 text-white/60">
                  Utiliza el servicio de emergencias de tu paÃ­s.
                </p>
              </div>
            </div>

            {config.emergency ? (
              <a
                href={`tel:${config.emergency}`}
                className="group flex min-h-[78px] items-center justify-between rounded-2xl border border-red-200/15 bg-red-500/10 px-5 transition hover:bg-red-500/15 active:scale-[0.99]"
              >
                <div>
                  <p className="text-sm text-red-100/70">
                    {config.emergencyLabel}
                  </p>
                  <p className="mt-0.5 text-3xl font-bold tracking-tight">
                    {config.emergency}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                  <Phone size={22} />
                </div>
              </a>
            ) : (
              <a
                href={helplineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[78px] items-center justify-between rounded-2xl border border-red-200/15 bg-red-500/10 px-5 transition hover:bg-red-500/15"
              >
                <div>
                  <p className="text-sm text-red-100/70">
                    Consulta el servicio de emergencias de {countryName}
                  </p>
                  <p className="mt-1 font-semibold">
                    Directorio internacional
                  </p>
                </div>

                <ExternalLink size={21} className="shrink-0" />
              </a>
            )}
          </section>

          <section className="mb-5 rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D8E9C3]/10 text-[#D8E9C3]">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Apoyo emocional y salud mental
                </h2>
                <p className="mt-1 text-sm leading-5 text-white/60">
                  Puedes buscar ayuda aunque no estÃ©s en una emergencia.
                </p>
              </div>
            </div>

            {config.support ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{config.support.name}</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-[#D8E9C3]">
                      {config.support.number}
                    </p>
                    {config.support.available && (
                      <p className="mt-1 text-xs text-white/45">
                        {config.support.available}
                      </p>
                    )}
                  </div>

                  <a
                    href={config.support.href}
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#D8E9C3] px-5 font-semibold text-[#171A14] transition hover:brightness-105 active:scale-[0.99]"
                  >
                    <Phone size={18} />
                    Llamar
                  </a>
                </div>

                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-white/60">
                  {config.support.description}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="font-semibold">
                  Encuentra apoyo en {countryName}
                </p>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  Busca lÃ­neas verificadas para ansiedad, depresiÃ³n, estrÃ©s,
                  crisis, autolesiones, consumo de sustancias y otras
                  situaciones emocionales.
                </p>

                <a
                  href={helplineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 text-sm font-semibold transition hover:bg-white/[0.1]"
                >
                  <Globe2 size={18} />
                  Buscar ayuda en mi paÃ­s
                  <ExternalLink size={15} />
                </a>
              </div>
            )}

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <a
                href={`${FIND_A_HELPLINE}/es-419`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-xs text-white/65 transition hover:bg-white/[0.07]"
              >
                Ansiedad y estrÃ©s
              </a>

              <a
                href={`${FIND_A_HELPLINE}/es-419`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-xs text-white/65 transition hover:bg-white/[0.07]"
              >
                DepresiÃ³n
              </a>

              <a
                href={`${FIND_A_HELPLINE}/es-419`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-xs text-white/65 transition hover:bg-white/[0.07]"
              >
                Crisis y otras situaciones
              </a>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D8E9C3]/10 text-[#D8E9C3]">
                  <Hospital size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Hospitales cercanos
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-white/60">
                    Puedes usar tu ubicaciÃ³n precisa para centrar el mapa.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={requestPreciseLocation}
                disabled={locationLoading}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-medium transition hover:bg-white/[0.1] disabled:cursor-wait disabled:opacity-60"
              >
                <LocateFixed size={17} />
                {locationLoading
                  ? "Buscando ubicaciÃ³n..."
                  : "Usar mi ubicaciÃ³n"}
              </button>
            </div>

            {locationError && (
              <div className="mb-4 rounded-2xl border border-amber-200/10 bg-amber-500/10 px-4 py-3 text-sm leading-5 text-amber-100/80">
                {locationError}
              </div>
            )}

            {mapUrl ? (
              <>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  <iframe
                    title="Mapa de ubicaciÃ³n aproximada y hospitales cercanos"
                    src={mapUrl}
                    className="h-[320px] w-full border-0 sm:h-[380px]"
                    loading="lazy"
                  />
                </div>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={hospitalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl bg-white/[0.08] px-4 text-sm font-semibold transition hover:bg-white/[0.12]"
                  >
                    <Hospital size={18} />
                    Buscar hospitales cercanos
                    <ExternalLink size={15} />
                  </a>

                  <a
                    href={`https://www.openstreetmap.org/?mlat=${geo.latitude}&mlon=${geo.longitude}#map=15/${geo.latitude}/${geo.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 text-sm text-white/65 transition hover:bg-white/[0.06]"
                  >
                    <MapPin size={17} />
                    Abrir mapa
                  </a>
                </div>
              </>
            ) : (
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 text-center">
                <MapPin
                  size={28}
                  strokeWidth={1.5}
                  className="text-white/35"
                />

                <p className="mt-3 font-medium text-white/80">
                  Necesitamos una ubicaciÃ³n para mostrar el mapa
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-white/45">
                  Calmavibe no guarda tus coordenadas. Solo se utilizan en
                  este dispositivo para centrar el mapa.
                </p>

                <button
                  type="button"
                  onClick={requestPreciseLocation}
                  className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#D8E9C3] px-5 text-sm font-semibold text-[#171A14] transition hover:brightness-105"
                >
                  <LocateFixed size={17} />
                  Permitir ubicaciÃ³n
                </button>
              </div>
            )}

            <p className="mt-3 text-center text-[11px] leading-5 text-white/35">
              Mapa: OpenStreetMap Â· La ubicaciÃ³n aproximada puede provenir de
              la conexiÃ³n. La ubicaciÃ³n precisa solo se usa cuando tÃº la
              autorizas.
            </p>
          </section>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-center text-xs leading-5 text-white/45">
            Calmavibe no sustituye a los servicios de emergencia ni a la
            atenciÃ³n profesional. Si existe peligro inmediato, utiliza el
            nÃºmero de emergencias de tu ubicaciÃ³n.
          </div>
        </div>
      </div>
    </Layout>
  );
}

