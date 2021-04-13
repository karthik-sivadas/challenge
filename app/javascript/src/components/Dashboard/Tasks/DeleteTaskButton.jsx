import React, { useState, useEffect } from "react";
import { Button } from "neetoui";
import tasksApi from "apis/tasks";
import DeleteAlert from "./DeleteAlert";

export default function DeleteTaskButton({ taskId, fetchTasks }) {

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <>
    <Button 
      style="icon" 
      icon="ri-delete-bin-line"
      className="mr-3"
      onClick={() => setShowDeleteAlert(true)}
    />
    {showDeleteAlert && (
      <DeleteAlert
        selectedTaskIds={[taskId]}
        onClose={() => setShowDeleteAlert(false)}
        refetch={fetchTasks}
      />
    )}
    </>
  );
}
