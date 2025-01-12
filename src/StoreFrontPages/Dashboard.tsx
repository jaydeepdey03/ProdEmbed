import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {ChartContainer} from "../components/ui/chart";
import {useEffect, useState} from "react";
import useGlobalContext from "@/context/useGlobalContext";
import {useParams} from "react-router-dom";
import {DollarSign, Package, ShoppingCart} from "lucide-react";
import {ethers} from "ethers";

const data = [
  {
    name: "Page A",
    total: 400,
  },
  {
    name: "Page B",
    total: 300,
  },
  {
    name: "Page C",
    total: 300,
  },
  {
    name: "Page D",
    total: 200,
  },
  {
    name: "Page E",
    total: 278,
  },
  {
    name: "Page F",
    total: 189,
  },
  {
    name: "Page G",
    total: 239,
  },
];

// const data1 = [
//   {
//     id: "m5gr84i9",
//     amount: 316,
//     status: "success",
//     email: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     amount: 242,
//     status: "success",
//     email: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     amount: 837,
//     status: "processing",
//     email: "Monserrat44@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },
// ];

export default function Dashboard() {
  const {ethereumAccount, etheruemContract} = useGlobalContext();
  const {id} = useParams();
  const [dashboardDetails, setDashboardDetails] = useState<any[]>([]);
  useEffect(() => {
    (async function () {
      try {
        if (ethereumAccount !== "" && etheruemContract) {
          const products = await etheruemContract.getDashboardDetails(
            ethereumAccount,
            id
          );
          setDashboardDetails(products);
          console.log(products);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [ethereumAccount, etheruemContract, id]);
  return (
    <div className="h-full w-full">
      <div className="mx-7">
        <div className="w-full h-32 mt-5 ounded-xl">
          <img
            // src="https://via.placeholder.com/1200x400"
            src={"https://gateway.ipfs.io/ipfs/" + dashboardDetails[3]}
            alt="Banner"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3 mb-8 mt-10 px-10">
        {dashboardDetails &&
          dashboardDetails.slice(0, 3).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {index == 0
                    ? "Total Revenue"
                    : index == 1
                    ? "Total Orders"
                    : "Total Products"}
                </CardTitle>
                {/* <card.icon className="h-4 w-4 text-muted-foreground" /> */}
                {index === 0 ? (
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                ) : index === 1 ? (
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Package className="h-4 w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {index === 0
                    ? `${ethers.utils.formatEther(
                        Number(dashboardDetails[0]._hex)
                      )} USDC`
                    : index === 1
                    ? Number(dashboardDetails[2]._hex)
                    : Number(dashboardDetails[1]._hex)}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <div className="px-10">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="w-full h-full flex gap-3 flex-col lg:flex-row">
          <Card className="w-full lg:w-1/2 h-full">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  total: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full pr-6"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="w-full lg:w-1/2 h-full">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  total: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full pr-6"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart width={730} height={250} data={data}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="total" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link to={`/producteditor/${product.id}`} key={product.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div> */}
      </div>
    </div>
  );
}
