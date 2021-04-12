class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks, id: :uuid do |t|
      t.string      :title, null: false
      t.string      :state, null: false
      t.string      :description, null: false
      t.datetime    :due_date
      t.boolean     :ace_invoice_entry, default: false
      t.boolean     :email_reminder, default: false
      t.references  :user, type: :uuid

      t.timestamps
    end
  end
end
