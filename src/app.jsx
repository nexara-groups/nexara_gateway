function App() {
  const [route, setRoute] = useState(parseRoute());
  React.useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route.page === "gateway" || !route.theme) {
    return <Gateway />;
  }
  if (route.theme === "trust") {
    return <TrustSite page={route.page} detail={route.detail} />;
  }
  return <Site theme={route.theme} page={route.page} detail={route.detail} />;
}


ReactDOM.createRoot(document.getElementById("root")).render(<App />);

