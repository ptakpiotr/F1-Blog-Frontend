import { Suspense, createContext, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  IJwtResponsePayload,
  ISeasonContext,
  IUserContext,
  IUserState,
} from "./Types";
import Loading from "./pages/Loading";
import { jwtDecode } from "jwt-decode";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Results = lazy(() => import("./pages/Results"));
const Race = lazy(() => import("./pages/Race"));
const Quali = lazy(() => import("./pages/Quali"));
const Standings = lazy(() => import("./pages/Standings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Posts = lazy(() => import("./pages/Posts"));
const Post = lazy(() => import("./pages/Post"));
const About = lazy(() => import("./pages/About"));

export const UserContext = createContext<Partial<IUserContext>>({});
export const SeasonContext = createContext<Partial<ISeasonContext>>({});

function App() {
  const [season, setSeason] = useState<string>(
    import.meta.env.VITE_CURRENT_SEASON ?? "2024"
  );

  const [userState, setUserState] = useState<IUserState>({
    isLoggedIn: false,
    userId: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode<IJwtResponsePayload>(token);
      
      setUserState({
        isLoggedIn: true,
        userId: decodedToken.userId?.toString(),
      });
    }
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <UserContext.Provider
        value={{
          userState,
          setUserState,
        }}
      >
        <SeasonContext.Provider
          value={{
            season,
            setSeason,
          }}
        >
          <BrowserRouter>
            <Header />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/results" element={<Results />} />
                <Route path="/standings" element={<Standings />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/about" element={<About />} />
                <Route path="/race/:season/:round" element={<Race />} />
                <Route path="/quali/:season/:round" element={<Quali />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </BrowserRouter>
        </SeasonContext.Provider>
      </UserContext.Provider>
    </FluentProvider>
  );
}

export default App;
