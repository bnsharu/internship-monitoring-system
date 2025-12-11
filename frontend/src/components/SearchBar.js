function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search"
      placeholder="🔍 Search student/company"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
export default SearchBar;
