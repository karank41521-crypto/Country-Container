export default function SelectMenu({setQuery}) {
  return (
      <select className="Filter-bar" onChange={(e) => setQuery(e.target.value.toLowerCase())}>
        <option hidden>Filter by a Region</option>
        <option value="Asia">Asia</option>
        <option value="America">Americas</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
  );
}
