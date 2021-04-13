import React from "react";
import { Pane } from "neetoui";
import NewTaskForm from "./NewTaskForm";

export default function NewTaskPane({ fetchTasks, showPane, setShowPane }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Create a new task" isOpen={showPane} onClose={onClose}>
      <div className="p-6">
        <NewTaskForm onClose={onClose} refetch={fetchTasks} />
      </div>
    </Pane>
  );
}
