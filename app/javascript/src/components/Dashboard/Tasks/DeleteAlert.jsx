import React, { useState } from "react";
import { Modal } from "neetoui";
import tasksApi from "apis/tasks";

export default function DeleteAlert({ refetch, onClose, selectedTaskIds }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await tasksApi.destroy({ ids: selectedTaskIds });
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Modal
      isOpen
      size="small"
      autoHeight
      showFooter
      submitButtonProps={{
        style: "danger",
        label: "Continue anyway",
        loading: deleting,
        onClick: handleDelete,
      }}
      onClose={onClose}
    >
      <div className="flex">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 rounded-full">
          <i className="text-red-500 ri-alarm-warning-fill ri-lg"></i>
        </div>

        <div className="ml-4">
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            Delete {selectedTaskIds.length} tasks?
          </h3>
          <div className="text-sm leading-5 text-gray-500">
            Are you sure you want to delete the task? All of your data will be permanently removed from the database forever. This action cannot be undone.
          </div>
        </div>
      </div>
    </Modal>
  );
}
