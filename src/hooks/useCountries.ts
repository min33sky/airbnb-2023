import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

/**
 * 세계 국가 목록 관련 훅
 */
export default function useCountries() {
  const getAll = () => formattedCountries;

  /**
   * 국가 정보 가져오기
   * @param value 국가 코드
   */
  const getByValue = (value: string) =>
    formattedCountries.find((country) => country.value === value);

  return {
    getAll,
    getByValue,
  };
}
