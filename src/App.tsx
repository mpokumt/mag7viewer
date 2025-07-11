import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Dashboard } from "./App/Dashboard";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Dashboard />
        </QueryClientProvider>
    );
};

export default App;
