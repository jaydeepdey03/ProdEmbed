import Navbar from "@/components/Navbar";
import {Button} from "@/components/ui/button";
import {House, Package, Settings} from "lucide-react";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";

const StoreDashboardLayout = () => {
  const {id} = useParams();
  const location = useLocation();
  console.log(location.pathname.split("/")[3], "location");
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div
        className="flex"
        style={{
          height: "calc(100vh - 70px)",
        }}
      >
        <div
          className={
            "pb-12 min-w-[250px] border-r border-gray-200 hidden md:block"
          }
        >
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    location.pathname.split("/")[3] === undefined
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => navigate(`/dashboard/${id}`)}
                >
                  <House className="mr-2 h-4 w-4" />
                  Dashboard Page
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    location.pathname.split("/")[3] === "products"
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => navigate(`/dashboard/${id}/products/${id}`)}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Products Page
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    location.pathname.split("/")[3] === "settings"
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => navigate(`/dashboard/${id}/settings/${id}`)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Outlet /> {/* This will render child routes */}
      </div>
    </div>
  );
};

export default StoreDashboardLayout;
