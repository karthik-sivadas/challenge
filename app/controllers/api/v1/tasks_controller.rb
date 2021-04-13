# frozen_string_literal: true

class Api::V1::TasksController < Api::V1::BaseController
  before_action :load_note, only: [:show, :delete]

  def index
    tasks = current_user.tasks
    render json: tasks
  end

  def create
    @task = Task.new(task_params.merge(user: current_user))
    if @task.save
      render json: { task: @task, notice: "#{@task.title.humanize} has been added to your tasks!" }
    else
      render json: { error: @task.errors.full_messages.to_sentence }, status: 422
    end
  end

  def bulk_delete
    tasks = Task.where(id: params[:ids], user: current_user)
    if tasks.empty?
      render json: { error: "No users found with those IDs" }, status: 422
    else
      tasks_count = tasks.size
      tasks.destroy_all
      render json: { notice: "#{tasks_count} tasks has been added deleted." }
    end
  end

  private

    def task_params
      params.require(:task).permit(:title, :description, :state, :due_date, :ace_invoice_entry, :email_reminder).to_h
    end

    def load_task
      @task = task.find(params[:id])
    end
end
