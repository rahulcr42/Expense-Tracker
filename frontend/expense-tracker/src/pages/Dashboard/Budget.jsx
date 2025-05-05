import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import BudgetList from "../../components/Budget/BudgetList";
import BudgetOverview from "../../components/Budget/BudgetOverview";
import AddBudgetForm from "../../components/Budget/AddBudgetForm";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";

const Budget = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [budgetData, setBudgetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddBudgetModal, setOpenAddBudgetModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Get All Budget Details
  const fetchBudgetDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.BUDGET.GET_ALL_BUDGET);

      if (response.data) {
        setBudgetData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
      toast.error("Failed to fetch budget details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Budget
  const handleAddBudget = async (budget) => {
    const { totalBudget, categories, startDate, endDate } = budget;

    // Validation Checks
    if (!totalBudget || isNaN(totalBudget) || totalBudget <= 0) {
      toast.error("Total budget should be a valid number greater than 0.");
      return;
    }

    if (!categories || categories.length === 0) {
      toast.error("At least one category is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.BUDGET.ADD_BUDGET, {
        totalBudget,
        categories,
        startDate,
        endDate,
      });

      setOpenAddBudgetModal(false);
      toast.success("Budget added successfully");
      fetchBudgetDetails();
    } catch (error) {
      console.error("Error adding budget:", error.response?.data?.message || error.message);
      toast.error("Error adding budget.");
    }
  };

  // Delete Budget
  const deleteBudget = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.BUDGET.DELETE_BUDGET(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Budget deleted successfully");
      fetchBudgetDetails();
    } catch (error) {
      console.error("Error deleting budget:", error.response?.data?.message || error.message);
      toast.error("Error deleting budget.");
    }
  };

  // handle download budget details
  const handleDownloadBudgetDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.BUDGET.DOWNLOAD_BUDGET, {
        responseType: "blob",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "budget_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading budget details:", error);
      toast.error("Failed to download budget details. Please try again.");
    }
  };

  useEffect(() => {
    fetchBudgetDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Budget">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <BudgetOverview
              budgets={budgetData}
              onAddBudget={() => setOpenAddBudgetModal(true)}
            />
          </div>

          <BudgetList
            budgets={budgetData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadBudgetDetails}
          />

          <Modal
            isOpen={openAddBudgetModal}
            onClose={() => setOpenAddBudgetModal(false)}
            title="Add Budget"
          >
            <AddBudgetForm onAddBudget={handleAddBudget} />
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Budget"
          >
            <DeleteAlert
              content="Are you sure you want to delete this budget?"
              onDelete={() => deleteBudget(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
