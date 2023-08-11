import Index from "./layouts";
import PersonalAI from "./pages/personal";

const AppRoutes = [
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <PersonalAI />,
      },
      {
        path: "/personal",
        element: <PersonalAI />,
      },
      {
        path: "/course",
        element: <PersonalAI />,
      },
      {
        path: "/dashboard",
        element: <PersonalAI />,
      },
      {
        path: "/profile",
        element: <PersonalAI />,
      },
    ],
  },
];

export default AppRoutes;
