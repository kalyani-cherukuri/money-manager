import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coins, Wallet, WalletCards, Loader2 } from "lucide-react"; 
import toast from "react-hot-toast";

// Internal configs and utilities
import axiosConfig from "../util/axiosConfig.jsx"; 
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { addThousandsSeparator } from "../util/util.js";
import { useUser } from "../hooks/useUser.jsx";

// Components
import Dashboard from "../components/Dashboard.jsx"; 
import InfoCard from "../components/InfoCard.jsx";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx"; // Restored
import Transactions from "../components/Transactions.jsx";

const Home = () => {
    // Acts as a route guard or session manager
    useUser();

    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA, {
                    signal: controller.signal
                });
                
                if (response.status === 200) {
                    setDashboardData(response.data);
                }
            } catch (error) {
                if (!axiosConfig.isCancel(error)) {
                    console.error('Something went wrong while fetching dashboard data:', error);
                    toast.error('Something went wrong!');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();

        return () => controller.abort();
    }, []); 

    // --- RENDER STATES ---

    if (loading && !dashboardData) {
        return (
            <Dashboard activeMenu="Dashboard">
                <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-purple-600" />
                    <p className="text-lg font-medium">Loading your finances...</p>
                </div>
            </Dashboard>
        );
    }

    const { 
        totalBalance = 0,
        totalIncome = 0,
        totalExpense = 0,
        recentTransactions = [],
        recent5Expenses = [],
        recent5Incomes = []
    } = dashboardData || {};

    return (
        <Dashboard activeMenu="Dashboard">
            <div className="my-5 mx-auto px-4">
                
                {/* Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<WalletCards />}
                        label="Total Balance"
                        value={addThousandsSeparator(totalBalance)}
                        color="bg-purple-800"
                    />
                    <InfoCard
                        icon={<Wallet />}
                        label="Total Income"
                        value={addThousandsSeparator(totalIncome)}
                        color="bg-green-800"
                    />
                    <InfoCard
                        icon={<Coins />}
                        label="Total Expense"
                        value={addThousandsSeparator(totalExpense)}
                        color="bg-red-800"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    
                    {/* Recent transactions Table */}
                    <RecentTransactions
                        transactions={recentTransactions}
                        onMore={() => navigate("/expense")}
                    />

                    {/* Finance overview Chart */}
                    <FinanceOverview
                        totalBalance={totalBalance}
                        totalIncome={totalIncome}
                        totalExpense={totalExpense}
                    />

                    {/* Detailed Expense List */}
                    <Transactions
                        transactions={recent5Expenses}
                        onMore={() => navigate("/expense")}
                        type="expense"
                        title="Recent Expenses"
                    />

                    {/* Detailed Income List */}
                    <Transactions
                        transactions={recent5Incomes}
                        onMore={() => navigate("/income")}
                        type="income"
                        title="Recent Incomes"
                    />
                    
                </div>
            </div>
        </Dashboard>
    );
};

export default Home;