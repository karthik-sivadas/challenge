import React from "react";
import { Checkbox, Badge, Button } from "neetoui";
import Moment from 'moment';
import DeleteTaskButton from "./DeleteTaskButton";

export default function TaskTable({
  selectedTaskIds,
  setSelectedTaskIds,
  tasks = [],
  fetchTask
}) {

  const setBadgeColor = (state) => {
    switch(state) {
      case 'open':
        return 'green';
      case 'spam':
        return 'red';
      case 'new':
        return 'blue';
      default:
        return 'blue';
    }
  }

  return (
    <div className="w-full px-6">
      <table className="nui-table nui-table--checkbox nui-table--actions">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedTaskIds.length === tasks.map(task => task.id).length
                }
                onClick={() => {
                  const taskIds = tasks.map(task => task.id);
                  if (selectedTaskIds.length === taskIds.length) {
                    setSelectedTaskIds([]);
                  } else {
                    setSelectedTaskIds(taskIds);
                  }
                }}
              />
            </th>
            <th className="text-left">TASK TITLE</th>
            <th className="text-left">DESCRIPTION</th>
            <th className="text-left">STATE</th>
            <th className="text-center">ACE INVOICE ENTRY</th>
            <th className="text-left">DUE DATE</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr
              key={task.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedTaskIds.includes(task.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedTaskIds.indexOf(task.id);

                    if (index > -1) {
                      setSelectedTaskIds([
                        ...selectedTaskIds.slice(0, index),
                        ...selectedTaskIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedTaskIds([...selectedTaskIds, task.id]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex flex-row items-center justify-start text-gray-900">
                  {task.title}
                </div>
              </td>
              <td>{task.description}</td>
              <td>
                <Badge color={setBadgeColor(task.state)}>
                  {task.state}
                </Badge>
              </td>
              <td>
                <div className="flex flex-row items-center justify-center text-gray-900">
                  <Checkbox
                    name="ace_invoice_entry"
                    checked={task.ace_invoice_entry}
                  />
                </div>
              </td>
              <td>{task.due_date ? Moment(task.due_date).zone(0).format("MMM Do, YYYY") : '--'}</td>
              <td className="flex justify-start">
                <Button 
                    style="icon" 
                    icon="ri-pencil-line"
                    className="mr-3"
                  />
                <DeleteTaskButton taskId={task.id} fetchTasks={fetchTask}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
