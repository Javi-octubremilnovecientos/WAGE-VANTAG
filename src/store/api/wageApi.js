import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * RTK Query API para datos salariales de Supabase
 * Base URL: https://idrgqvtgllamddukkkvx.supabase.co/rest/v1
 *
 * Tablas disponibles:
 * - TABLE_1: COUNTRY, GENDER, OCCUPATION_4_DIGITS, OCCUPATION_3_DIGITS, ECONOMIC_ACTIVITY, EDUCATION_LEVEL, MEAN_MONTHLY_WAGE, YEAR
 * - TABLE_2: COUNTRY, SEX, EDUCATION, COMPANY_SIZE, ECONOMIC_ACTIVITY, MEAN_MONTHLY_WAGE
 * - TABLE_3: COUNTRY, SEX, ECONOMIC_ACTIVITY, OCCUPATION_3_DIGITS, COMPANY_SIZE, MEAN_MONTHLY_WAGE
 * - TABLE_4: COUNTRY, SEX, ECONOMIC_ACTIVITY, MEAN_MONTHLY_WAGE
 * - TABLE_5: COUNTRY, SEX, EDUCATION, MEAN_MONTHLY_WAGE
 * - TABLE_6: COUNTRY, SEX, OCCUPATION_4_DIGITS, MEAN_MONTHLY_WAGE
 */
export const wageApi = createApi({
  reducerPath: "wageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${supabaseUrl}/rest/v1`,
    prepareHeaders: (headers) => {
      headers.set("apikey", supabaseKey);
      headers.set("Authorization", `Bearer ${supabaseKey}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Wages", "WagesByCountry", "Historical", "Sectors"],
  endpoints: (builder) => ({
    // Obtiene todos los datos de TABLE_1
    getAllWages: builder.query({
      query: () => "/TABLE_1?select=*",
      providesTags: ["Wages"],
    }),

    // Obtiene salarios filtrados por país
    getWagesByCountry: builder.query({
      query: (country) =>
        `/TABLE_1?COUNTRY=eq.${encodeURIComponent(country)}&select=*`,
      providesTags: (result, error, country) => [
        { type: "WagesByCountry", id: country },
      ],
    }),

    // Obtiene salarios con filtros combinados (país, género, actividad, educación)
    getWagesByFilters: builder.query({
      query: ({ country, gender, economicActivity, educationLevel, year }) => {
        let url = "/TABLE_1?select=*";
        if (country) url += `&COUNTRY=eq.${encodeURIComponent(country)}`;
        if (gender) url += `&GENDER=eq.${encodeURIComponent(gender)}`;
        if (economicActivity)
          url += `&ECONOMIC_ACTIVITY=eq.${encodeURIComponent(economicActivity)}`;
        if (educationLevel)
          url += `&EDUCATION_LEVEL=eq.${encodeURIComponent(educationLevel)}`;
        if (year) url += `&YEAR=eq.${year}`;
        return url;
      },
      providesTags: ["Wages"],
    }),

    // Datos históricos por país (para gráfico de barras)
    getHistoricalWages: builder.query({
      query: (country) =>
        `/TABLE_1?COUNTRY=eq.${encodeURIComponent(country)}&select=YEAR,MEAN_MONTHLY_WAGE&order=YEAR.asc`,
      providesTags: (result, error, country) => [
        { type: "Historical", id: country },
      ],
    }),

    // Distribución por sector/actividad económica (TABLE_4)
    getSectorDistribution: builder.query({
      query: (country) =>
        `/TABLE_4?COUNTRY=eq.${encodeURIComponent(country)}&select=ECONOMIC_ACTIVITY,MEAN_MONTHLY_WAGE`,
      providesTags: (result, error, country) => [
        { type: "Sectors", id: country },
      ],
    }),

    // Datos por educación (TABLE_5)
    getWagesByEducation: builder.query({
      query: ({ country, sex }) => {
        let url = `/TABLE_5?select=COUNTRY,SEX,EDUCATION,MEAN_MONTHLY_WAGE`;
        if (country) url += `&COUNTRY=eq.${encodeURIComponent(country)}`;
        if (sex) url += `&SEX=eq.${encodeURIComponent(sex)}`;
        return url;
      },
    }),

    // Datos por tamaño de empresa (TABLE_2)
    getWagesByCompanySize: builder.query({
      query: ({ country, sex }) => {
        let url = `/TABLE_2?select=COUNTRY,SEX,COMPANY_SIZE,MEAN_MONTHLY_WAGE`;
        if (country) url += `&COUNTRY=eq.${encodeURIComponent(country)}`;
        if (sex) url += `&SEX=eq.${encodeURIComponent(sex)}`;
        return url;
      },
    }),

    // Datos por ocupación 4 dígitos (TABLE_6)
    getWagesByOccupation: builder.query({
      query: ({ country, sex }) => {
        let url = `/TABLE_6?select=COUNTRY,SEX,OCCUPATION_4_DIGITS,MEAN_MONTHLY_WAGE`;
        if (country) url += `&COUNTRY=eq.${encodeURIComponent(country)}`;
        if (sex) url += `&SEX=eq.${encodeURIComponent(sex)}`;
        return url;
      },
    }),

    // Lista de países únicos disponibles
    getAvailableCountries: builder.query({
      query: () => "/TABLE_1?select=COUNTRY&order=COUNTRY.asc",
      transformResponse: (response) => {
        const countries = [...new Set(response.map((r) => r.COUNTRY))];
        return countries.filter(Boolean);
      },
    }),

    // Lista de actividades económicas únicas
    getEconomicActivities: builder.query({
      query: () => "/TABLE_1?select=ECONOMIC_ACTIVITY",
      transformResponse: (response) => {
        const activities = [
          ...new Set(response.map((r) => r.ECONOMIC_ACTIVITY)),
        ];
        return activities.filter(Boolean).sort();
      },
    }),

    // Lista de ocupaciones únicas (4 dígitos)
    getOccupations: builder.query({
      query: () => "/TABLE_1?select=OCCUPATION_4_DIGITS",
      transformResponse: (response) => {
        const occupations = [
          ...new Set(response.map((r) => r.OCCUPATION_4_DIGITS)),
        ];
        return occupations.filter(Boolean).sort();
      },
    }),
  }),
});

// Export hooks autogenerados
export const {
  useGetAllWagesQuery,
  useGetWagesByCountryQuery,
  useGetWagesByFiltersQuery,
  useGetHistoricalWagesQuery,
  useGetSectorDistributionQuery,
  useGetWagesByEducationQuery,
  useGetWagesByCompanySizeQuery,
  useGetWagesByOccupationQuery,
  useGetAvailableCountriesQuery,
  useGetEconomicActivitiesQuery,
  useGetOccupationsQuery,
} = wageApi;
