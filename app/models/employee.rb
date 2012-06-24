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
end
