class Task < ApplicationRecord
  belongs_to :user
  validates  :title, :description, :state, presence: true
  validates  :title, uniqueness: true
end
