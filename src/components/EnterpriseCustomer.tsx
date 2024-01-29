import "datatables.net-dt/css/jquery.dataTables.css";
import ReactDataTables from "./ReactDataTables";

const data = [
  {
    id: "1",
    name: "Tiger Nixon",
    start_date: "2011/04/25",
    adress: "Edinburgh",
    lastUpdate: "",
    locationX: "2",
    locationY: "16",
  },
  {
    id: "2",
    name: "Garrett Winters",
    start_date: "2011/04/25",
    adress: "Edinburgh",
    lastUpdate: "",
    locationX: "3",
    locationY: "25",
  },
];

const columns = [
  { data: "name", title: "Name" },
  { data: "start_date", title: "start_date" },
  { data: "locationX", title: "locationX" },
  { data: "locationY", title: "locationY" },
];

const EmployeeTable = () => {
  return <ReactDataTables data={data} columns={columns} />;
};

export default EmployeeTable;