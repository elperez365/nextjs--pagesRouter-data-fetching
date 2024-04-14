import useSWR from "swr";

export default function LastSalesPage(props) {
  const { data: sales, error } = useSWR(
    "https://nextjscourse-7892a-default-rtdb.firebaseio.com/sales.json",
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      return transformedSales;
    }
  );

  if (error) {
    return <p>No sales data yet</p>;
  }

  if (!sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales?.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}
