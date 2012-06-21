class Employee < ActiveRecord::Base
  attr_accessible :date_of_birth, :first_name, :salary, :surname, :id

  #def self.formatted_date_of_birth(date_of_birth)
  #  date = date_of_birth.day.to_s + ' ' + date_of_birth.month.to_s + ' '+ date_of_birth.year.to_s
  #end
end
