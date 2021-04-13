import React from "react";
import { Checkbox } from "neetoui";
import Moment from 'moment';

export default function TaskTable({
  selectedTaskIds,
  setSelectedTaskIds,
  tasks = [],
}) {
  return (
    <div className="w-full px-6">
      <table className="nui-table nui-table--checkbox">
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
              <td>{task.state}</td>
              <td>
                <div className="flex flex-row items-center justify-center text-gray-900">
                  <Checkbox
                    name="ace_invoice_entry"
                    checked={task.ace_invoice_entry}
                  />
                </div>
              </td>
              <td>{task.due_date ? Moment(task.due_date).zone(0).format("MMM Do, YYYY") : '--'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
