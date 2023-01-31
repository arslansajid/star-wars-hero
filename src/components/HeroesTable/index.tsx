import "./styles.css";

interface HeroesTableProps {
  data: any;
  isLoading: boolean;
}

const HeroesTable = (props: HeroesTableProps) => {
  const { data, isLoading } = props;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name </th>
            <th>Height</th>
            <th>Birth Year</th>
            <th>Eye Color</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((item: any) => (
              <tr key={`${item.name}_${item.height}`}>
                <td>{item.name}</td>
                <td>{item.height}</td>
                <td>{item.birth_year}</td>
                <td>{item.eye_color}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan={4}>
                {isLoading ? "Loading..." : "No data found!"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HeroesTable;
