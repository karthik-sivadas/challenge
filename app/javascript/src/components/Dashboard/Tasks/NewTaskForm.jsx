import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Select, CheckBox, Switch } from "neetoui/formik";
import { Button, DateInput } from "neetoui";
import tasksApi from "apis/tasks";

export default function NewTaskForm({ onClose, refetch }) {
  const handleSubmit = async values => {
    try {
      console.log({description: values.description, 
        state: values.state.value, 
        title: values.title,
        due_date: values.due_date,
        ace_invoice_entry: values.ace_invoice_entry,
        email_reminder: values.email_reminder
       });
      await tasksApi.create({description: values.description, 
                             state: values.state.value, 
                             title: values.title,
                             due_date: values.due_date,
                             ace_invoice_entry: values.ace_invoice_entry,
                             email_reminder: values.email_reminder
                            });
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };

  const TASK_STATE_SELECT_OPTIONS = [
    { value: "new", label: "New" },
    { value: "open", label: "Open" },
    { value: "spam", label: "Spam" },
  ];

  
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        state: { value: "new", label: "New" }
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
      })}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <Input label="Title" name="title" className="mb-3" />
          <Select
            label="Task State"
            placeholder="Select an Option"
            defaultValue={{ value: "new", label: "New" }}
            isSearchable={true}
            name="state"
            className="mb-4"
            options={TASK_STATE_SELECT_OPTIONS}
            onChange={option => setFieldValue('state', option)}
          />
          <DateInput 
            label="Due Date"
            selected={values.startDate}
            className="form-control mb-4"
            name="due_date"
            onChange={date => setFieldValue('due_date', date)}
          />
          <Input label="Description" name="description" className="mb-4"/>
          <div className="flex justify-between mb-4">
            <span>Create Ace Invoice Entry for the task</span>
            <CheckBox
              name="ace_invoice_entry"
            /> 
          </div>
          <div className="flex justify-between mb-4">
            <span>Send reminder email for the task</span>
            <Switch
              name="email_reminder"
            /> 
          </div>
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
