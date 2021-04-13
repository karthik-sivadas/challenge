import React, { useState, useEffect } from "react";
import tasksApi from "apis/tasks";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyTasksListImage from "images/EmptyNotesList";
import { PageHeading, SubHeader } from "neetoui/layouts";
import { useAuthDispatch } from "contexts/auth";
import authenticationApi from "apis/authentication";
import { resetAuthTokens } from "apis/axios";
import { Toastr } from "neetoui";

import TaskTable from "./TaskTable";
import NewTaskPane from "./NewTaskPane";
import DeleteAlert from "./DeleteAlert";
import AccountDropdown from "./AccountDropdown";

const Tasks = () => {
  const authDispatch = useAuthDispatch();
  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      Toastr.error(error);
    }
  };

  const [loading, setLoading] = useState(true);
  const [showNewTaskPane, setShowNewTaskPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksApi.fetch();
      setTasks(response.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <PageHeading
        title="Tasks"
        rightButton={() => (
          <div className="flex flex-row">
            <div className="pr-6">
              <AccountDropdown handleLogout={handleLogout} />
            </div>
            <div>
              <Button
                onClick={() => setShowNewTaskPane(true)}
                label="New task"
                icon="ri-add-line"
              />
            </div>
          </div>
        )}
      />
      {tasks.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedTaskIds.length,
            }}
            paginationProps={{
              count: 241,
              pageNo: 1,
              pageSize: 50
            }}
            toggleFilter={{
              value: "test"
            }}
            sortProps={{
              options: [
                {label: "Task Title", value: "title"},
                {label: "Description", value: "description"},
                {label: "State", value: "state"},
                {label: "Ace Invoice Entry", value: "ace_invoice_entry"},
                {label: "Due Date", value: "due_date"}
              ]
            }}
          />
          <div className="flex justify-center">
            <div className="w-5/6">
              <TaskTable
                selectedTaskIds={selectedTaskIds}
                setSelectedTaskIds={setSelectedTaskIds}
                tasks={tasks}
              />
            </div>
          </div>
        </>
      ) : (
        <EmptyState
          image={EmptyTasksListImage}
          title="Looks like you don't have any tasks!"
          subtitle="Add your tasks to send customized emails to them."
          primaryAction={() => setShowNewTaskPane(true)}
          primaryActionLabel="Add new task"
        />
      )}
      <NewTaskPane
        showPane={showNewTaskPane}
        setShowPane={setShowNewTaskPane}
        fetchTasks={fetchTasks}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedTaskIds={selectedTaskIds}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchTasks}
        />
      )}
    </>
  );
};

export default Tasks;
