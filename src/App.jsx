import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./pages/Home";
import { FetchOld } from "./pages/FetchOld";
import { FetchRQ } from "./pages/FetchRQ";
import { Fetchindiv } from "./components/UI/Fetchindiv";
import { InfinteScroll } from "./pages/InfinteScroll";
import "./App.css";

// create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/trad",
        element: <FetchOld></FetchOld>,
      },
      {
        path: "/rq",
        element: <FetchRQ></FetchRQ>,
      },
      {
        path: "/rq/:id",
        element: <Fetchindiv></Fetchindiv>,
      },
      {
        path: "/infinite",
        element: <InfinteScroll></InfinteScroll>,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
