
class Employee < ActiveRecord::Base
  attr_accessible :date_of_birth, :first_name, :salary, :surname, :id

  validates :first_name,  :presence => true,
            :length => {:minimum => 2, :maximum => 15}

  validates :surname, :presence => true,
            :length => {:minimum => 2, :maximum => 15}

  validates :date_of_birth, :presence => true #,
  #:format => {:with => /^(19|20)\d\d[-\.] (0[1-9]|1[012])[-\.](0[1-9]|[12][0-9]|3[01])$/i}

  validates :salary,  :presence => true,
            :format => {:with => /[0-9]+/i}
			

	def self.to_csv 
		employees_headers = "First Name,Surname,Date of Birth,Salary".split(',')
		employees = Employee.all		
		csv_data = FasterCSV.generate do |csv| 
			csv << employees_headers
			employees.each do |emp| 
				csv << [emp.first_name, emp.surname, emp.date_of_birth,emp.salary]
			end 
		end 
		return csv_data
	end
end
