

const Filter = ({ filterName, setFilterName, handleFilterName }) => (
  <div>
    filter shown with <input value={filterName} onChange={handleFilterName} />
  </div>
)

export default Filter
