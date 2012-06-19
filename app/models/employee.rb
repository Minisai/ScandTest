class Employee < ActiveRecord::Base
  attr_accessible :date_of_birth, :first_name, :salary, :surname
end
